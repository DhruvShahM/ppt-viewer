import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.tools import tool
from langgraph.prebuilt import create_react_agent
from langchain_core.messages import HumanMessage

# 1. SETUP: Paste your API Key here
os.environ["GOOGLE_API_KEY"] = "AIzaSyACEVDovxqsfPwlcnNZEHJNc7YKJVxOObQ"

# 2. DEFINE THE BRAIN: Use Gemini 1.5 Flash (It's free and fast)
llm = ChatGoogleGenerativeAI(
    model="gemini-flash-latest",
    temperature=0.7
)

# 3. DEFINE TOOLS: Give the agent something to do
# For this free example, we'll give it a simple math tool. 
# (In a real scenario, you'd add web search or file reading tools here)

@tool
def calculator(input_text: str) -> str:
    """Useful for when you need to answer questions about math."""
    try:
        # Ensure input is clean string and calculate
        return str(eval(str(input_text)))
    except:
        return "I couldn't calculate that."

tools = [calculator]

# 4. INITIALIZE THE AGENT
# Using LangGraph's prebuilt React agent which replaces the deprecated AgentExecutor
agent_executor = create_react_agent(llm, tools)

# 5. RUN THE AGENT
print("Agent is ready! (Type 'quit' to exit)")
while True:
    user_input = input("\nYou: ")
    if user_input.lower() in ["quit", "exit"]:
        break
    
    # Run the graph
    try:
        response = agent_executor.invoke({"messages": [HumanMessage(content=user_input)]})
        # The last message in the sequence is the agent's final response
        print(f"Agent: {response['messages'][-1].content}")
    except Exception as e:
        print(f"Error: {e}")