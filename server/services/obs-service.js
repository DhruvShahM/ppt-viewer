const OBSWebSocket = require('obs-websocket-js').default;
const path = require('path');
const fs = require('fs');
const obsConfig = require('../config/obs');

class OBSService {
    constructor() {
        this.obs = new OBSWebSocket();
        this.isConnected = false;
    }

    async connect() {
        if (this.isConnected) return;
        try {
            await this.obs.connect(obsConfig.obs.address, obsConfig.obs.password);
            this.isConnected = true;
            console.log('Connected to OBS');
        } catch (error) {
            console.error('Failed to connect to OBS:', error);
            throw new Error('Could not connect to OBS. Is it running and WebSocket enabled?');
        }
    }

    async disconnect() {
        if (!this.isConnected) return;
        await this.obs.disconnect();
        this.isConnected = false;
    }

    async setupScene(slideUrl) {
        await this.connect();

        // 1. Get current scene
        const { currentProgramSceneName } = await this.obs.call('GetCurrentProgramScene');

        // 2. Find a Browser Source in the current scene (or any scene)
        // For simplicity, we assume there's a source named "SlideDeck" or we find the first Browser Source
        const { sceneItems } = await this.obs.call('GetSceneItemList', { sceneName: currentProgramSceneName });

        // Note: OBS structure is complex. We need to find a source that is a 'browser_source'
        // But GetSceneItemList returns items, we need to check their source kind.
        // Actually, we can just try to SetInputSettings on a known name like 'Browser' or 'SlideBrowser'
        // OR we try to find it.

        let browserSourceName = 'Browser'; // Default common name

        // Smart search: Check items for one that looks like a browser source
        // (This part relies on source naming convention or trial-and-error in a real generic app)
        // We'll enforce a convention: Source must be named "Browser" or "SlideDeck"

        const targetSource = sceneItems.find(item => item.sourceName === 'Browser' || item.sourceName === 'SlideDeck');
        if (targetSource) {
            browserSourceName = targetSource.sourceName;
        }

        console.log(`Updating OBS source '${browserSourceName}' to URL: ${slideUrl}`);

        try {
            await this.obs.call('SetInputSettings', {
                inputName: browserSourceName,
                inputSettings: {
                    url: slideUrl,
                    width: 1920,
                    height: 1080
                }
            });

            // Refresh it to ensure it loads the new URL clean
            await this.obs.call('PressInputPropertiesButton', {
                inputName: browserSourceName,
                propertyName: 'refreshnocache'
            });

        } catch (e) {
            console.warn(`Could not update source '${browserSourceName}':`, e);
            throw new Error(`Could not find or update OBS source '${browserSourceName}'. Please create a Browser Source named 'Browser'.`);
        }
    }

    async record(deckId, slideIndex, duration, slideUrl) {
        await this.connect();

        // 1. Setup Scene
        await this.setupScene(slideUrl);

        // Wait for page to load in OBS (a few seconds)
        await new Promise(r => setTimeout(r, 3000));

        // 2. Start Recording
        console.log('Starting OBS recording...');
        const { outputPath } = await this.obs.call('StartRecord');
        // Note: older obs-websocket might not return path immediately, strictly it returns nothing on success usually
        // We will get the path from the StopRecord event or call GetRecordStatus

        // 3. Wait duration
        await new Promise(r => setTimeout(r, duration * 1000));

        // 4. Stop Recording
        console.log('Stopping OBS recording...');
        const stopResponse = await this.obs.call('StopRecord');

        // stopResponse.outputPath should contain the file path
        console.log('OBS Recording finished:', stopResponse.outputPath);

        return stopResponse.outputPath;
    }
}

module.exports = new OBSService();
