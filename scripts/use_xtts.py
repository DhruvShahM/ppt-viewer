import os
import torch
from TTS.api import TTS

# 1. Agree to Coqui TOS automatically
os.environ["COQUI_TOS_AGREED"] = "1"

# Fix for PyTorch 2.6+ weights_only=True default
# We monkey-patch torch.load to default weights_only=False for this script
# This is necessary because the Coqui XTTS model checkpoint contains pickled custom classes
try:
    _original_load = torch.load
    def _safe_load(*args, **kwargs):
        if 'weights_only' not in kwargs:
            kwargs['weights_only'] = False
        return _original_load(*args, **kwargs)
    torch.load = _safe_load
except Exception:
    pass # Should not fail, but safety first

# Constants
MODEL_NAME = "tts_models/multilingual/multi-dataset/xtts_v2"
OUTPUT_FILE = "output_xtts_demo.wav"
SPEAKER_WAV = os.path.join(os.path.dirname(__file__), "speaker_sample.wav")

def main():
    print(f"Checking for speaker sample at: {SPEAKER_WAV}")
    if not os.path.exists(SPEAKER_WAV):
        print("❌ Speaker sample not found! Please create 'scripts/speaker_sample.wav' first.")
        # Create a dummy file if needed or just specific instructions
        return

    # Check for GPU
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"🚀 Initializing XTTS v2 on {device}...")

    try:
        # Initialize TTS
        tts = TTS(MODEL_NAME).to(device)
        
        text = "Hello! This is a demonstration of the Coqui XTTS v2 model running in a Python script."
        
        print(f"🎙️ Generating audio for: '{text}'")
        
        # Generate Audio
        tts.tts_to_file(
            text=text,
            file_path=OUTPUT_FILE,
            speaker_wav=SPEAKER_WAV,
            language="en"
        )
        
        print(f"✅ Success! Audio saved to {os.path.abspath(OUTPUT_FILE)}")

    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    main()
