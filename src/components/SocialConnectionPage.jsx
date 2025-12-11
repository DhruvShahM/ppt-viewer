import React, { useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import {
    LayoutGrid,
    LogOut,
    RefreshCw,
    Youtube,
    Linkedin as LinkedinIcon,
    Facebook,
    Instagram,
    MessageCircle,
    CheckCircle2,
    Plus,
    X,
    Settings,
    Save,
    Upload,
    Video,
    FileVideo,
    Send
} from 'lucide-react';

const GET_SOCIAL_DATA = gql`
    query GetSocialData {
        getConnectedAccounts {
            id
            platform
            username
            profilePicture
            isConnected
            isEnabled
            lastSyncedAt
        }
        getDashboardFeed {
            id
            platform
            content
            mediaUrl
            mediaType
            likesCount
            commentsCount
            publishedAt
            authorName
            authorImage
        }
    }
`;

const DISCONNECT_ACCOUNT = gql`
    mutation DisconnectAccount($platform: String!, $accountId: String) {
        disconnectAccount(platform: $platform, accountId: $accountId)
    }
`;

const TOGGLE_ACCOUNT_STATUS = gql`
    mutation ToggleAccountStatus($platform: String!, $accountId: String!, $isEnabled: Boolean!) {
        toggleAccountStatus(platform: $platform, accountId: $accountId, isEnabled: $isEnabled)
    }
`;

const SocialConnectionPage = ({ onBack }) => {
    const { loading, error, data, refetch } = useQuery(GET_SOCIAL_DATA, {
        pollInterval: 10000 // Auto-refresh every 10s
    });
    const [disconnect] = useMutation(DISCONNECT_ACCOUNT);
    const [toggleStatus] = useMutation(TOGGLE_ACCOUNT_STATUS);
    const [isDemoMode, setIsDemoMode] = React.useState(false);

    useEffect(() => {
        // Listen for message from popup
        const handleMessage = (event) => {
            if (event.data.type === 'SOCIAL_AUTH_SUCCESS') {
                refetch();
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [refetch]);

    const handleConnect = (platform) => {
        // Open popup
        const width = 600;
        const height = 700;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;

        const url = `http://localhost:3001/api/auth/${platform}${isDemoMode ? '?simulated=true' : ''}`;

        window.open(
            url,
            `Connect ${platform}`,
            `width=${width},height=${height},top=${top},left=${left}`
        );
    };

    const handleDisconnect = async (platform, accountId = null) => {
        if (confirm(`Are you sure you want to disconnect ${accountId ? 'this account' : 'all accounts for ' + platform}?`)) {
            await disconnect({ variables: { platform, accountId } });
            refetch();
        }
    };

    const handleToggleStatus = async (platform, accountId, currentStatus) => {
        await toggleStatus({
            variables: {
                platform,
                accountId,
                isEnabled: !currentStatus
            }
        });
        refetch();
    };

    const platforms = [
        { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-500', bg: 'bg-pink-500/10' },
        { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-600/10' },
        { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'text-red-600', bg: 'bg-red-600/10' },
        { id: 'linkedin', name: 'LinkedIn', icon: LinkedinIcon, color: 'text-blue-700', bg: 'bg-blue-700/10' },
        { id: 'reddit', name: 'Reddit', icon: MessageCircle, color: 'text-orange-600', bg: 'bg-orange-600/10' },
    ];

    const getAccount = (platformId) => {
        return data?.getConnectedAccounts?.find(a => a.platform === platformId);
    };

    const [showSettings, setShowSettings] = React.useState(false);
    const [configKeys, setConfigKeys] = React.useState({});

    const [testResult, setTestResult] = React.useState(null);

    // Direct Post Modal State
    const [showPostModal, setShowPostModal] = React.useState(false);
    const [postCaption, setPostCaption] = React.useState('');
    const [postFile, setPostFile] = React.useState(null);
    const [uploading, setUploading] = React.useState(false);
    const [selectedPostAccounts, setSelectedPostAccounts] = React.useState([]);

    const fileInputRef = React.useRef(null);

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            setPostFile(e.target.files[0]);
        }
    };

    const handleDirectUploadAndPost = async () => {
        if (!postFile || !postCaption || selectedPostAccounts.length === 0) {
            alert("Please select a file, add a caption, and choose at least one account.");
            return;
        }

        setUploading(true);
        try {
            // 1. Upload File
            const formData = new FormData();
            formData.append('file', postFile);

            const uploadRes = await fetch('http://localhost:3001/api/upload-media', {
                method: 'POST',
                body: formData
            });
            const uploadData = await uploadRes.json();

            if (!uploadData.success) throw new Error("Upload failed");

            // 2. Schedule Post
            // Get platforms from selected account IDs
            const accounts = data?.getConnectedAccounts || [];
            const selectedAccs = accounts.filter(a => selectedPostAccounts.includes(a.id));
            const platforms = [...new Set(selectedAccs.map(a => a.platform))];

            await fetch('http://localhost:3001/api/social/schedule', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    caption: postCaption,
                    platforms: platforms,
                    scheduledTime: new Date().toISOString(),
                    mediaType: 'video',
                    mediaPath: uploadData.url,
                    deckId: 'social-direct-upload', // Generic ID
                    slideIndex: 0
                })
            });

            alert("✅ Post scheduled successfully!");
            setShowPostModal(false);
            setPostFile(null);
            setPostCaption('');
            setSelectedPostAccounts([]);

        } catch (e) {
            console.error(e);
            alert("Failed to post: " + e.message);
        } finally {
            setUploading(false);
        }
    };

    const togglePostAccount = (id) => {
        setSelectedPostAccounts(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    useEffect(() => {
        if (showSettings) {
            fetch('http://localhost:3001/api/config/keys')
                .then(res => res.json())
                .then(data => setConfigKeys(data));
        }
    }, [showSettings]);

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data.type === 'SOCIAL_AUTH_SUCCESS') {
                if (showSettings) {
                    setTestResult({
                        type: 'success',
                        message: `✅ Verified: Connected as ${event.data.user.name} (${event.data.platform})`
                    });
                    setTimeout(() => setTestResult(null), 5000);
                }
                refetch();
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [refetch, showSettings]);

    const saveKeys = async (formData) => {
        const updates = {};
        let hasPlaceholders = false;

        for (let [key, value] of formData.entries()) {
            if (value && value.startsWith('YOUR_')) {
                hasPlaceholders = true;
            }
            if (value && value !== '••••••••') {
                updates[key] = value;
            }
        }

        if (hasPlaceholders) {
            alert('⚠️ Warning: It looks like you are using placeholder values (e.g., "YOUR_..."). These will NOT work. Please replace them with actual keys.');
            return null;
        }

        await fetch('http://localhost:3001/api/config/keys', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        });

        return updates;
    };

    const handleSaveKeys = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        await saveKeys(formData);

        setShowSettings(false);
        alert('Credentials saved! You can now use Real Authentication.');
    };

    const handleGoogleJsonUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target.result);
                const creds = json.web || json.installed;

                if (creds && creds.client_id && creds.client_secret) {
                    // Update state to reflect in UI immediately
                    setConfigKeys(prev => ({
                        ...prev,
                        GOOGLE_CLIENT_ID: creds.client_id,
                        GOOGLE_CLIENT_SECRET: creds.client_secret
                    }));
                    alert("✅ Credentials loaded from JSON! Click 'Save Credentials' to apply.");
                } else {
                    alert("❌ Invalid JSON format. Looked for 'web' or 'installed' object with 'client_id' and 'client_secret'.");
                }
            } catch (err) {
                alert("❌ Error parsing JSON file: " + err.message);
            }
        };
        reader.readAsText(file);
    };

    const handleTestConnection = async (platform) => {
        // Find the form and save current values first
        const form = document.getElementById('settings-form');
        const formData = new FormData(form);
        await saveKeys(formData);

        setTestResult({ type: 'info', message: `🔄 Testing connection to ${platform}... Check popup.` });

        const width = 600;
        const height = 700;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;

        const url = `http://localhost:3001/api/auth/${platform}${isDemoMode ? '?simulated=true' : ''}`;

        window.open(url, `Test ${platform}`, `width=${width},height=${height},top=${top},left=${left}`);
    };

    if (loading && !data) return <div className="flex justify-center items-center h-full"><RefreshCw className="animate-spin" /></div>;

    return (
        <div className="w-full h-full overflow-y-auto p-8 relative z-10">
            {/* Settings Modal */}
            {showSettings && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
                        {testResult && (
                            <div className={`absolute top-0 left-0 w-full p-3 text-center text-sm font-medium ${testResult.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                {testResult.message}
                            </div>
                        )}
                        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Settings className="text-purple-400" /> Configure API Credentials
                            </h2>
                            <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-white">
                                <X />
                            </button>
                        </div>
                        <form id="settings-form" onSubmit={handleSaveKeys} className="p-6 space-y-6">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Google / YouTube</h3>
                                    <div className="flex gap-2">
                                        <label className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded transition border border-slate-700 cursor-pointer flex items-center gap-1">
                                            <Upload size={12} /> Upload JSON
                                            <input type="file" accept=".json" className="hidden" onChange={handleGoogleJsonUpload} />
                                        </label>

                                        <button type="button" onClick={() => handleTestConnection('youtube')} className="text-xs bg-slate-800 hover:bg-slate-700 text-blue-400 px-3 py-1 rounded transition border border-slate-700">
                                            Test Connection
                                        </button>
                                    </div>
                                </div>

                                {/* List Connected Accounts inside Modal */}
                                {data?.getConnectedAccounts?.filter(a => a.platform === 'youtube').length > 0 && (
                                    <div className="space-y-2 mb-4 bg-slate-900/50 p-2 rounded border border-slate-700/50">
                                        <h4 className="text-xs text-slate-500 font-medium mb-2">Connected Accounts:</h4>
                                        {data.getConnectedAccounts.filter(a => a.platform === 'youtube').map(acc => (
                                            <div key={acc.id} className="flex items-center justify-between bg-slate-800 p-2 rounded">
                                                <div className="flex items-center gap-2">
                                                    {acc.profilePicture ? (
                                                        <img src={acc.profilePicture} className="w-6 h-6 rounded-full" />
                                                    ) : (
                                                        <div className="w-6 h-6 rounded-full bg-slate-700" />
                                                    )}
                                                    <span className={`text-sm ${!acc.isEnabled ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
                                                        {acc.username}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {/* Toggle Switch */}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleToggleStatus('youtube', acc.id, acc.isEnabled)}
                                                        className={`w-8 h-4 rounded-full p-0.5 transition-colors relative ${acc.isEnabled !== false ? 'bg-green-600' : 'bg-slate-600'}`}
                                                        title={acc.isEnabled !== false ? "Disable" : "Enable"}
                                                    >
                                                        <div className={`w-3 h-3 bg-white rounded-full transition-transform ${acc.isEnabled !== false ? 'translate-x-4' : 'translate-x-0'}`} />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDisconnect('youtube', acc.id)}
                                                        className="text-xs text-red-400 hover:text-red-300 px-2"
                                                        title="Logout"
                                                    >
                                                        <LogOut size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-slate-500 mb-1">Client ID</label>
                                        <input
                                            name="GOOGLE_CLIENT_ID"
                                            value={configKeys.GOOGLE_CLIENT_ID || ''}
                                            onChange={(e) => setConfigKeys(prev => ({ ...prev, GOOGLE_CLIENT_ID: e.target.value }))}
                                            className="w-full bg-slate-800 border-slate-700 rounded p-2 text-sm text-white"
                                            placeholder="apps.googleusercontent.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-slate-500 mb-1">Client Secret</label>
                                        <input
                                            name="GOOGLE_CLIENT_SECRET"
                                            value={configKeys.GOOGLE_CLIENT_SECRET || ''}
                                            onChange={(e) => setConfigKeys(prev => ({ ...prev, GOOGLE_CLIENT_SECRET: e.target.value }))}
                                            type="password"
                                            className="w-full bg-slate-800 border-slate-700 rounded p-2 text-sm text-white"
                                            placeholder="Secret Key"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-slate-800">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">LinkedIn</h3>
                                    <button type="button" onClick={() => handleTestConnection('linkedin')} className="text-xs bg-slate-800 hover:bg-slate-700 text-blue-400 px-3 py-1 rounded transition border border-slate-700">
                                        Test Connection
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-slate-500 mb-1">Client ID</label>
                                        <input name="LINKEDIN_CLIENT_ID" defaultValue={configKeys.LINKEDIN_CLIENT_ID} className="w-full bg-slate-800 border-slate-700 rounded p-2 text-sm text-white" />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-slate-500 mb-1">Client Secret</label>
                                        <input name="LINKEDIN_CLIENT_SECRET" defaultValue={configKeys.LINKEDIN_CLIENT_SECRET} type="password" className="w-full bg-slate-800 border-slate-700 rounded p-2 text-sm text-white" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-slate-800">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Facebook / Instagram</h3>
                                    <button type="button" onClick={() => handleTestConnection('facebook')} className="text-xs bg-slate-800 hover:bg-slate-700 text-blue-400 px-3 py-1 rounded transition border border-slate-700">
                                        Test Connection
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-slate-500 mb-1">App ID</label>
                                        <input name="FACEBOOK_APP_ID" defaultValue={configKeys.FACEBOOK_APP_ID} className="w-full bg-slate-800 border-slate-700 rounded p-2 text-sm text-white" />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-slate-500 mb-1">App Secret</label>
                                        <input name="FACEBOOK_APP_SECRET" defaultValue={configKeys.FACEBOOK_APP_SECRET} type="password" className="w-full bg-slate-800 border-slate-700 rounded p-2 text-sm text-white" />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 flex justify-end gap-3">
                                <button type="button" onClick={() => setShowSettings(false)} className="px-4 py-2 rounded text-slate-300 hover:text-white transition">Cancel</button>
                                <button type="submit" className="px-6 py-2 rounded bg-purple-600 hover:bg-purple-500 text-white font-medium flex items-center gap-2">
                                    <Save size={16} /> Save Credentials
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}



            <div className="absolute left-8 top-1 flex items-center gap-4">
                <button
                    onClick={() => onBack()}
                    className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition text-slate-400 hover:text-white"
                >
                    <X size={20} />
                </button>
                <button
                    onClick={() => setShowPostModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-full shadow-lg hover:shadow-pink-500/25 transition transform hover:scale-105"
                >
                    <Video size={18} /> Create Post
                </button>
            </div>

            <header className="mb-12 text-center mt-8 relative">
                <div className="absolute right-0 top-0 flex items-center gap-4">
                    <button
                        onClick={() => setShowSettings(true)}
                        className="p-2 mr-2 text-slate-400 hover:text-white bg-slate-800/50 rounded-full hover:bg-slate-700 transition"
                        title="Configure API Credentials"
                    >
                        <Settings size={20} />
                    </button>

                    <div className="flex items-center gap-2">
                        <label className="text-xs text-slate-400 font-medium mr-2">Demo Mode</label>
                        <button
                            onClick={() => setIsDemoMode(!isDemoMode)}
                            className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${isDemoMode ? 'bg-purple-600' : 'bg-slate-700'}`}
                        >
                            <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ${isDemoMode ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                    </div>
                </div>

                <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    Social Ecosystem
                </h1>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    Manage your digital presence across all networks. Connect accounts to sync posts, analytics, and profile data in one unified dashboard.
                </p>
                {isDemoMode && (
                    <div className="mt-4 text-xs text-purple-400 bg-purple-900/20 inline-block px-3 py-1 rounded-full border border-purple-500/30">
                        ⚡ Simulation Mode Active: Connections will be simulated
                    </div>
                )}
            </header>

            {/* Connection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
                {platforms.map(p => {
                    const accounts = data?.getConnectedAccounts?.filter(a => a.platform === p.id) || [];
                    const Icon = p.icon;
                    const isConnected = accounts.length > 0;

                    return (
                        <div key={p.id} className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6 flex flex-col items-center hover:border-slate-600 transition group relative overflow-hidden">
                            <div className={`absolute top-0 w-full h-1 ${isConnected ? 'bg-green-500' : 'bg-slate-700'}`} />

                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${p.bg} ${p.color}`}>
                                <Icon size={32} />
                            </div>

                            <h3 className="text-lg font-semibold mb-1">{p.name}</h3>

                            <div className="w-full mb-4 min-h-[24px]">
                                {isConnected ? (
                                    <div className="flex flex-col gap-2">
                                        {accounts.map(acc => (
                                            <div key={acc.id} className="flex items-center justify-between bg-slate-800/50 px-2 py-1.5 rounded text-xs text-slate-300">
                                                <div className="flex items-center gap-1.5 overflow-hidden">
                                                    <CheckCircle2 size={10} className={`${acc.isEnabled !== false ? 'text-green-500' : 'text-slate-500'} shrink-0`} />
                                                    <span className={`truncate ${acc.isEnabled === false ? 'text-slate-500 line-through' : ''}`} title={acc.username}>{acc.username}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleToggleStatus(p.id, acc.id, acc.isEnabled); }}
                                                        className={`text-[10px] px-1.5 py-0.5 rounded border ${acc.isEnabled !== false ? 'border-green-800 text-green-500' : 'border-slate-700 text-slate-500'}`}
                                                    >
                                                        {acc.isEnabled !== false ? 'ON' : 'OFF'}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDisconnect(p.id, acc.id)}
                                                        className="ml-1 text-slate-500 hover:text-red-500 transition"
                                                        title="Disconnect this account"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        {accounts.length > 1 && (
                                            <button
                                                onClick={() => handleDisconnect(p.id)}
                                                className="text-xs text-red-500 hover:text-red-400 hover:underline mt-1 self-center"
                                            >
                                                Disconnect All
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-xs text-slate-500 text-center">Not Connected</div>
                                )}
                            </div>

                            <button
                                onClick={() => handleConnect(p.id)}
                                className={`w-full py-2 px-4 rounded-lg text-white text-sm font-medium transition mt-auto shadow-lg flex items-center justify-center gap-2 ${isConnected
                                    ? 'bg-slate-700 hover:bg-slate-600 border border-slate-600'
                                    : 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/20'
                                    }`}
                            >
                                <Plus size={16} /> {isConnected ? 'Add Another' : 'Connect'}
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* FEED SECTION */}
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <LayoutGrid className="text-purple-400" />
                        Unified Feed
                    </h2>
                    <span className="text-sm text-slate-500">Syncing real-time across connected platforms</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data?.getDashboardFeed?.map(post => {
                        const p = platforms.find(pl => pl.id === post.platform);
                        const Icon = p ? p.icon : LayoutGrid;

                        return (
                            <div key={post.id} className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden hover:scale-[1.02] transition duration-300 shadow-xl">
                                {post.mediaType === 'IMAGE' && (
                                    <div className="h-48 overflow-hidden">
                                        <img src={post.mediaUrl} alt="Post content" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                {post.mediaType === 'VIDEO' && (
                                    <div className="h-48 bg-black">
                                        <video src={post.mediaUrl} className="w-full h-full object-contain" controls />
                                    </div>
                                )}

                                <div className="p-5">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            {post.authorImage ? (
                                                <img src={post.authorImage} className="w-8 h-8 rounded-full" />
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-slate-700" />
                                            )}
                                            <span className="text-sm font-medium text-slate-300">{post.authorName}</span>
                                        </div>
                                        <Icon size={16} className={p?.color || 'text-white'} />
                                    </div>

                                    <p className="text-sm text-slate-400 mb-4 line-clamp-3">
                                        {post.content}
                                    </p>

                                    <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-800">
                                        <div>{new Date(post.publishedAt).toLocaleDateString()}</div>
                                        <div className="flex gap-3">
                                            <span>{post.likesCount} Likes</span>
                                            <span>{post.commentsCount} Comments</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {(!data?.getDashboardFeed || data.getDashboardFeed.length === 0) && (
                        <div className="col-span-full py-20 text-center text-slate-500 bg-slate-900/30 rounded-2xl border border-dashed border-slate-800">
                            No posts found. Connect accounts to see your ecosystem.
                        </div>
                    )}
                </div>
            </div>

            {/* Create Post Modal */}
            {showPostModal && (
                <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95">
                        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <Video className="text-pink-500" /> Create New Post
                            </h3>
                            <button onClick={() => setShowPostModal(false)} className="text-slate-400 hover:text-white"><X size={20} /></button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* File Upload */}
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${postFile ? 'border-green-500 bg-green-500/10' : 'border-slate-700 hover:border-blue-500 hover:bg-slate-800'}`}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileSelect}
                                    accept="video/*"
                                    className="hidden"
                                />
                                {postFile ? (
                                    <div className="flex flex-col items-center gap-2 text-green-400">
                                        <FileVideo size={48} />
                                        <span className="font-medium text-sm">{postFile.name}</span>
                                        <span className="text-xs opacity-75">Click to change</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-slate-400">
                                        <Upload size={32} />
                                        <span className="text-sm">Click to upload video</span>
                                        <span className="text-[10px] uppercase tracking-wider opacity-50">MP4, WebM (Max 50MB)</span>
                                    </div>
                                )}
                            </div>

                            {/* Caption */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Caption</label>
                                <textarea
                                    value={postCaption}
                                    onChange={(e) => setPostCaption(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 min-h-[100px]"
                                    placeholder="What's on your mind?"
                                />
                            </div>

                            {/* Account Selector */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Publish To</label>
                                <div className="flex flex-wrap gap-2">
                                    {data?.getConnectedAccounts?.length > 0 ? (
                                        data.getConnectedAccounts.map(acc => (
                                            <button
                                                key={acc.id}
                                                onClick={() => togglePostAccount(acc.id)}
                                                disabled={acc.isEnabled === false}
                                                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition-all ${selectedPostAccounts.includes(acc.id)
                                                        ? 'bg-blue-600 border-blue-500 text-white'
                                                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                                                    } ${acc.isEnabled === false ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            >
                                                {/* Simple Icon Map */}
                                                {acc.platform === 'youtube' && <Youtube size={12} />}
                                                {acc.platform === 'linkedin' && <LinkedinIcon size={12} />}
                                                {acc.platform === 'facebook' && <Facebook size={12} />}
                                                {acc.platform === 'instagram' && <Instagram size={12} />}
                                                {acc.platform === 'reddit' && <MessageCircle size={12} />}
                                                {acc.username}
                                            </button>
                                        ))
                                    ) : (
                                        <div className="text-xs text-slate-500">No connected accounts.</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex justify-end gap-3">
                            <button
                                onClick={() => setShowPostModal(false)}
                                className="px-4 py-2 text-slate-400 hover:text-white text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDirectUploadAndPost}
                                disabled={uploading || !postFile || !postCaption || selectedPostAccounts.length === 0}
                                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {uploading ? <RefreshCw className="animate-spin" size={16} /> : <Send size={16} />}
                                {uploading ? 'Uploading...' : 'Schedule Post'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SocialConnectionPage;
