import React, { useState, useRef } from 'react';
import JSZip from 'jszip';
import { Upload, FileText, Download, Loader2, File, CheckCircle, AlertCircle, RefreshCcw, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TEXT_EXTENSIONS = {
    '.go': 'go',
    '.py': 'python',
    '.js': 'javascript',
    '.ts': 'typescript',
    '.java': 'java',
    '.cpp': 'cpp',
    '.c': 'c',
    '.html': 'html',
    '.css': 'css',
    '.md': 'markdown',
    '.json': 'json',
    '.xml': 'xml',
    '.sql': 'sql',
    '.sh': 'bash',
    '.yaml': 'yaml',
    '.yml': 'yaml',
    '.txt': 'text',
    '.jsx': 'javascript',
    '.tsx': 'typescript',
    '.vue': 'html',
    '.rs': 'rust',
    '.dart': 'dart'
};

const ProjectFilesExtractor = ({ onBack }) => {
    const [file, setFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setResult(null);
            setError(null);
        }
    };

    const isTextFile = (filename) => {
        const ext = '.' + filename.split('.').pop().toLowerCase();
        return Object.keys(TEXT_EXTENSIONS).includes(ext) || Object.keys(TEXT_EXTENSIONS).some(k => filename.toLowerCase().endsWith(k));
    };

    const getLanguageFromExtension = (filename) => {
        const ext = '.' + filename.split('.').pop().toLowerCase();
        for (const [key, value] of Object.entries(TEXT_EXTENSIONS)) {
            if (filename.toLowerCase().endsWith(key)) {
                return value;
            }
        }
        return 'text';
    };

    const processZip = async () => {
        if (!file) return;

        setIsProcessing(true);
        setProgress(0);
        setError(null);
        let markdownContent = "";

        try {
            const zip = await JSZip.loadAsync(file);
            const files = [];

            zip.forEach((relativePath, zipEntry) => {
                if (!zipEntry.dir && isTextFile(zipEntry.name) && !zipEntry.name.includes('node_modules') && !zipEntry.name.startsWith('.')) {
                    files.push(zipEntry);
                }
            });

            files.sort((a, b) => a.name.localeCompare(b.name));

            const totalFiles = files.length;

            for (let i = 0; i < totalFiles; i++) {
                const zipEntry = files[i];
                const content = await zipEntry.async("string");

                markdownContent += `## ${zipEntry.name}\n`;
                const language = getLanguageFromExtension(zipEntry.name);
                markdownContent += `\`\`\`${language}\n${content}\n\`\`\`\n\n`;

                setProgress(Math.round(((i + 1) / totalFiles) * 100));
            }

            setResult(markdownContent);
            setProgress(100);

        } catch (err) {
            console.error("Error processing zip:", err);
            setError("Failed to process ZIP file: " + err.message);
        } finally {
            setIsProcessing(false);
        }
    };

    const downloadMarkdown = () => {
        if (!result) return;

        const blob = new Blob([result], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${file.name.replace('.zip', '')}_extracted.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="w-full h-full min-h-screen bg-slate-950 text-white p-8 overflow-y-auto relative">
            <button
                onClick={onBack}
                className="absolute top-8 left-8 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                title="Back"
            >
                <ArrowLeft size={24} />
            </button>

            <div className="max-w-3xl mx-auto mt-12">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-6">
                        <FileText size={48} className="text-blue-400" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Project Files Extractor
                    </h1>
                    <p className="text-xl text-gray-400">
                        Upload a ZIP file of your project to combine all code files into a single Markdown document.
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                    {!file ? (
                        <div
                            className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-pointer group"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept=".zip"
                                className="hidden"
                            />
                            <Upload size={48} className="mx-auto mb-4 text-gray-500 group-hover:text-blue-400 transition-colors" />
                            <h3 className="text-xl font-medium mb-2 group-hover:text-white transition-colors">Upload Project ZIP</h3>
                            <p className="text-gray-500">Click to browse or drag and drop</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-500/20 rounded-lg">
                                        <File size={24} className="text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-lg">{file.name}</h3>
                                        <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setFile(null);
                                        setResult(null);
                                        setError(null);
                                        setProgress(0);
                                    }}
                                    className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                                >
                                    <RefreshCcw size={20} />
                                </button>
                            </div>

                            {!result && !error && (
                                <button
                                    onClick={processZip}
                                    disabled={isProcessing}
                                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                >
                                    {isProcessing ? (
                                        <>
                                            <Loader2 className="animate-spin" />
                                            Processing... {progress}%
                                        </>
                                    ) : (
                                        <>
                                            <FileText size={20} />
                                            Generate Markdown
                                        </>
                                    )}
                                </button>
                            )}

                            {error && (
                                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 flex items-center gap-3">
                                    <AlertCircle size={24} />
                                    {error}
                                </div>
                            )}

                            {result && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-4"
                                >
                                    <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-200 flex items-center gap-3">
                                        <CheckCircle size={24} />
                                        Success! Markdown generated.
                                    </div>

                                    <button
                                        onClick={downloadMarkdown}
                                        className="w-full py-4 bg-green-600 rounded-xl font-bold text-lg hover:bg-green-500 hover:shadow-lg transition-all flex items-center justify-center gap-3"
                                    >
                                        <Download size={20} />
                                        Download Markdown File
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectFilesExtractor;
