import os
import sys
import re
import argparse
import torch
from TTS.api import TTS

# usage: python scripts/process_script_to_audio.py --deckId my-deck --script script.txt

def parse_script(script_path):
    with open(script_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex to find sections like "--- Slide 1 ---" or "Slide 1:"
    # We support flexible headers
    pattern = re.compile(r'--- Slide (\d+) ---|Slide (\d+):', re.IGNORECASE)
    
    parts = pattern.split(content)
    # parts[0] is text before first header
    # parts[1] is slide number (captured group 1)
    # parts[2] is slide number (captured group 2)
    # parts[3] is text for that slide...
    
    slides = {}
    
    current_text = parts[0].strip()
    if current_text:
        slides[0] = current_text # Intro/Slide 0?

    i = 1
    while i < len(parts):
        slide_num_str = parts[i] or parts[i+1] # One of them is not None
        text = parts[i+2].strip()
        
        slide_num = int(slide_num_str)
        slides[slide_num] = text
        
        i += 3
        
    return slides

def main():
    parser = argparse.ArgumentParser(description='Generate audio from script file')
    parser.add_argument('--deckId', required=True, help='ID of the deck')
    parser.add_argument('--script', required=True, help='Path to script text file')
    parser.add_argument('--gpu', action='store_true', help='Use GPU if available')
    
    args = parser.parse_args()
    
    # 1. Setup Output Dir
    output_dir = os.path.join(os.getcwd(), 'public', 'audio', args.deckId)
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    # 2. Parse Script
    print(f"Parsing script: {args.script}")
    slides = parse_script(args.script)
    print(f"Found {len(slides)} sections.")
    
    # 3. Init TTS
    print("Initializing TTS Model (XTTS v2)... this may take a moment.")
    device = "cuda" if args.gpu and torch.cuda.is_available() else "cpu"
    print(f"Using device: {device}")
    
    # Initialize TTS
    try:
        tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2").to(device)
    except Exception as e:
        print(f"Error loading model: {e}")
        return

    # Speaker sample (required for XTTS)
    # We look for 'speaker_sample.wav' in scripts/ or args
    # For now hardcoded to scripts/speaker_sample.wav
    speaker_wav = os.path.join(os.getcwd(), 'scripts', 'speaker_sample.wav')
    if not os.path.exists(speaker_wav):
        print(f"Error: Speaker sample not found at {speaker_wav}")
        print("Please run: powershell ./scripts/create_sample.ps1")
        return

    # 4. Generate Audio
    for slide_num, text in slides.items():
        if not text:
            continue
            
        filename = f"{slide_num}.wav"
        output_path = os.path.join(output_dir, filename)
        
        print(f"Generating Slide {slide_num}: {text[:50]}...")
        
        try:
            tts.tts_to_file(
                text=text, 
                file_path=output_path, 
                speaker_wav=speaker_wav, 
                language="en"
            )
        except Exception as e:
            print(f"Failed to generate Slide {slide_num}: {e}")

    print("Done! Audio files saved to:", output_dir)

if __name__ == "__main__":
    main()
