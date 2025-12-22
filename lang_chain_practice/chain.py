from dotenv import load_dotenv
import os
from langchain_core.prompts import PromptTemplate
from langchain_ollama import ChatOllama
import openai
load_dotenv()

def main():
    print("Hello from lang-chain-practice!")
    print("OPEN_API_KEY:", os.getenv("OPEN_API_KEY"))
    print("OLLAMA_API_KEY:", os.getenv("OLLAMA_API_KEY"))
    print("MODEL_NAME:", os.getenv("MODEL_NAME"))

    if os.getenv("API_HOST").lower() == "ollama":
        BASE_URL = "http://localhost:11434"
        model = ChatOllama(
                    #model="mistral:instruct",
                    model="gemma3:270m",
                    base_url=BASE_URL,
                    validate_model_on_init=True,
                    temperature=0.8,
                    )   
    
    summary_template = """
    You are a helpful assistant that genrates Gherkin scenarios from given {text}.
    Here are the rules to follow:
    - Start with Featrure: followed by a brief title.
    - Start each scenario with 'Scenario:'.
    - Use the Given-When-Then format.
    - Ensure scenarios are clear and concise.
    - Cover all key aspects mentioned in the text.
    - Ensure all scenarios are unique and non-repetitive.
    - Generate at least 1 positive and 1 negative scenario for each AC.
    - Understand the AC's as well as any hidden requirements.
    - Output the scenarios as text.
    """

    text = """
    As an DAI user I want the  System Under Test(SUT) and Execution Environment(EE)  sections of Test config page to be adjusted and moved to the right hand side so that more space is available to accommodate a dropdown for SUT list, to enable the users to choose SUT's by name, criteria tag or cloud SUT

    At the moment, in the SUT configuration in DAI, we can choose an execution environment to use with that SUT. So, SUT1 = Agent 1. And any time we run against SUT1, Agent1 needs to be connected.

    We can also NOT choose an agent at all, and any runs against SUT1 will pick up whichever agent is free.

    For parity, customers ideally need the option to choose both the SUT and the agent at run time. 

    Additionally the ability to change SUT on demand/runtime/between test steps, possibly to control a multi-SUT test (e.g. where actions in one SUT should sync and be examined in another etc) which (maybe optionally) locks all declared SUTs until the configuration is done.

    Currently, it is possible to associate a SUT with one or more execution environments. The purpose of this functionality is to inform DAI that a SUT can only be accessed from certain EEs. 

    For example, the SUT might be a physical device (such as a phone) that is connected to one particular EE with a USB cable. Alternatively, a SUT may be on a subnet that is only accessible from certain EEs.

    However, in practice, many of our users have found this functionality confusing: they often seem to associate every SUT with an EE, even when this is not necessary, and they struggle to understand which EE will be used to execute a particular test config.

    So, we will remove this association, and instead allow the user to explicitly select which EE to use for each test config (see below).

    AC:
    The SUT & EE section in test config page must be displayed on right hand side of the UI

    The SUT section must have a heading 'System under test(SUT)'

    The EE section must have a heading 'Execution settings' with a subheading of 'Execution environment'

    The SUT section must have space to include a scrollable drop down with a list of SUT's. The dropdown will display a maximum of 10 SUT's at a time.

    All components of the page must be displayed correctly in 1366 x 768  resolution.

    When a user edits a test config, the SUT/EE sections are displayed correctly with the headings and resolution.

    When a user creates a test config, the SUT/EE sections are displayed correctly with headings and resolution.
    The SUT/EE sections must be aligned to the right hand side of the page.
    """
    
    summary_prompt_template = PromptTemplate(
        input_variables=["text"],
        template=summary_template
    )

    """
    This is one way to call the OpenAI API using LangChain
    1. Define the prompt template
    2. Format the prompt with the input text
    3. Chain the model with the prompt
    4. Print the response
    """ 
    chain = summary_prompt_template | model
    response = chain.invoke({"text": text})
    print("Generated Gherkin Scenarios:\n", response.content)


if __name__ == "__main__":
    main()
