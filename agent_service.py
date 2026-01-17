import os
import sys
import json
import argparse
from typing import List, Dict, Any, Optional
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.tools import tool
from langgraph.prebuilt import create_react_agent
from langchain_core.messages import HumanMessage

# CONSTANTS
DECK_CONTENT_PATH = os.path.join(os.path.dirname(__file__), 'deck-content.json')
# Ensure API Key is set - simpler for this environment to hardcode if env var missing, 
# but per instructions reusing the one from demo.py or assuming env.
# For robustness in this specific user env, I'll set it if missing, matching demo.py
if "GOOGLE_API_KEY" not in os.environ:
    os.environ["GOOGLE_API_KEY"] = "AIzaSyACEVDovxqsfPwlcnNZEHJNc7YKJVxOObQ"

def load_deck_content() -> Dict[str, Any]:
    try:
        with open(DECK_CONTENT_PATH, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        return {"deckName": "New Presentation", "totalSlides": 0, "slides": []}

def save_deck_content(content: Dict[str, Any]):
    with open(DECK_CONTENT_PATH, 'w', encoding='utf-8') as f:
        json.dump(content, f, indent=2)

@tool
def create_slide(title: str, raw_text: str, react_code_content: str, component_name: str) -> str:
    """
    Creates a new slide and appends it to the deck.
    
    Args:
        title: The title of the slide.
        raw_text: Text content for search/indexing.
        react_code_content: The full React component code (e.g., "import ...; const Component ...").
        component_name: The name of the React component (must be unique, e.g., 'Slide12_Mutex').
    """
    deck = load_deck_content()
    
    new_slide_number = deck.get("totalSlides", 0) + 1
    
    new_slide = {
        "slideNumber": new_slide_number,
        "component": component_name,
        "title": title,
        "rawText": raw_text,
        "fileContent": react_code_content
    }
    
    deck["slides"].append(new_slide)
    deck["totalSlides"] = new_slide_number
    
    save_deck_content(deck)
    return f"Successfully created slide {new_slide_number}: {title}"

@tool
def update_slide(slide_number: int, title: Optional[str] = None, raw_text: Optional[str] = None, react_code_content: Optional[str] = None) -> str:
    """
    Updates an existing slide by its slide number.
    
    Args:
        slide_number: The number of the slide to update (1-based index).
        title: (Optional) New title.
        raw_text: (Optional) New raw text.
        react_code_content: (Optional) New React component code.
    """
    deck = load_deck_content()
    
    # Find slide
    slide_index = -1
    for i, slide in enumerate(deck["slides"]):
        if slide["slideNumber"] == slide_number:
            slide_index = i
            break
            
    if slide_index == -1:
        return f"Error: Slide number {slide_number} not found."
    
    # Update fields
    if title:
        deck["slides"][slide_index]["title"] = title
    if raw_text:
        deck["slides"][slide_index]["rawText"] = raw_text
    if react_code_content:
        deck["slides"][slide_index]["fileContent"] = react_code_content
        
    save_deck_content(deck)
    return f"Successfully updated slide {slide_number}."

@tool
def get_deck_structure() -> str:
    """Returns a summary of the current deck structure (titles and slide numbers only)."""
    deck = load_deck_content()
    summary = []
    for slide in deck.get("slides", []):
        summary.append(f"Slide {slide['slideNumber']}: {slide['title']} (Component: {slide['component']})")
    return "\n".join(summary)

def main():
    parser = argparse.ArgumentParser(description='AI Agent for Slide Generation')
    parser.add_argument('prompt', type=str, help='The user prompt')
    args = parser.parse_args()

    # Initialize LLM
    llm = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash-001",
        temperature=0.7
    )
    
    # Define Tools
    tools = [create_slide, update_slide, get_deck_structure]
    
    # Create Agent
    agent_executor = create_react_agent(llm, tools)
    
    # Run Agent
    try:
        # We need to give the agent context about what it is and what it should output.
        system_message = """You are an expert Presentation Creator and Go (Golang) Developer. 
        Your job is to manage a presentation deck about Go Concurrency.
        
        When asked to create a slide:
        1. create a valid React component using 'framer-motion' for animations and Tailwind CSS for styling.
        2. Ensure the code is self-contained.
        3. Use the `create_slide` tool to save it.
        
        When asked to update a slide:
        1. Use `update_slide` to modify specific fields.
        
        When asked for info, look up the deck structure first.
        
        Always reply with a concise summary of what you did.
        """
        
        # Combine system message and user prompt? 
        # Actually create_react_agent usually handles tools. We can inject a system prompt if supported, 
        # or just prepend it to the user message for simplicity in this script.
        
        full_prompt = f"{system_message}\n\nUser Request: {args.prompt}"
        
        response = agent_executor.invoke({"messages": [HumanMessage(content=full_prompt)]})
        
        # Output the final helper response as JSON for the Node server to parse
        result = {
            "success": True,
            "message": response['messages'][-1].content
        }
        print(json.dumps(result))
        
    except Exception as e:
        error_result = {
            "success": False,
            "error": str(e)
        }
        print(json.dumps(error_result))

if __name__ == "__main__":
    main()
