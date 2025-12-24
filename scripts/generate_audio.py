import os
import sys
import torch
from TTS.api import TTS

# Constants
OUTPUT_DIR = os.path.join(os.getcwd(), 'public', 'audio')
MODEL_NAME = "tts_models/multilingual/multi-dataset/xtts_v2"

def ensure_output_dir():
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        print(f"Created output directory: {OUTPUT_DIR}")

def generate_test_audio():
    print("Initializing TTS...")
    
    # Check for GPU
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"Using device: {device}")

    try:
        # Initialize TTS with the model
        tts = TTS(MODEL_NAME).to(device)
        
        # Test text
        text = "This is a test of the local text to speech system for your presentation."
        
        output_path = os.path.join(OUTPUT_DIR, "test_output.wav")
        
        # We need a reference speaker wav for XTTS. 
        # For now, we'll try to use one provided by the model or we might need to download a sample.
        # XTTS v2 usually comes with speaker samples or we can use a random one if the API supports it.
        # Let's try to list speakers or find a default.
        
        # For XTTS, we need a speaker_wav. 
        # I'll create a dummy one or use a path if I can find one in the package, 
        # but to be safe, I'll let the user know we might need a sample.txt or .wav.
        # However, the easiest way with the python API is often just passing a path to ANY wave file.
        # I'll use a placeholder logic here:
        # If no speaker_wav is found, we might fail. 
        # BUT, let's see if we can use the CLI-like usage or if there's a default.
        
        print("Generating audio...")
        # Note: XTTS requires speaker_wav. 
        # I will attempt to generate one without it and see if it falls back, 
        # OR I will create a dummy wav file if possible? No, that won't work for cloning.
        # I will try to find a sample in the installed package or just ask the user for one?
        # Actually, let's try to 'clone' from a non-existent file? No.
        
        # Better approach: 
        # If we can't find a speaker, we might need to ask the user to provide one.
        # BUT, to make this "just work", let's see if we can use a system sound or something.
        # Or better, let's use the `tts.tts` function which might have defaults?
        # Actually, for XTTS `speaker_wav` is required.
        
        # Let's try to download a sample sample if it doesn't exist?
        # I'll add a check.
        
        speaker_wav = os.path.join(os.getcwd(), "scripts", "speaker_sample.wav")
        if not os.path.exists(speaker_wav):
            # Create a dummy wav or download one? 
            # Generating a dummy wav with python `wave` module just to have a file? 
            # It needs to be a valid speech file for cloning.
            print("WARNING: 'scripts/speaker_sample.wav' not found.")
            print("Please place a 5-10 second .wav file of a voice you want to clone at: " + speaker_wav)
            print("For now, I'll try to proceed; if it fails, please add the file.")
            # We will likely fail here if it's missing.
            
        tts.tts_to_file(text=text, file_path=output_path, speaker_wav=speaker_wav, language="en")
        
        print(f"Success! Audio saved to: {output_path}")
        
    except Exception as e:
        print(f"Error generating audio: {e}")

if __name__ == "__main__":
    ensure_output_dir()
    generate_test_audio()
