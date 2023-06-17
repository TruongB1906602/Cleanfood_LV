# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

# from typing import Any, Text, Dict, List
#
# from rasa_sdk import Action, Tracker
# from rasa_sdk.executor import CollectingDispatcher
#
#
# class ActionHelloWorld(Action):
#
#     def name(self) -> Text:
#         return "action_hello_world"
#
#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#
#         dispatcher.utter_message(text="Hello World!")
#
#         return []
import re
import requests
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.events import SlotSet
from rasa_sdk.executor import CollectingDispatcher


class ActionPlayVideo(Action):

    def name(self) -> Text:
        return "action_play_video"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        # Get video link from user message
        video_link = tracker.latest_message['text']

        # Extract video id from link
        video_id = re.search(r'(?<=v=)[^&#]+', video_link)
        video_id = video_id or re.search(r'(?<=be/)[^&#]+', video_link)
        video_id = video_id.group(0) if video_id else None

        # If video id is found, send message with video iframe
        if video_id:
            iframe_url = f"https://www.youtube.com/embed/{video_id}"
            message = {
                "type": "video",
                "payload": {
                    "src": iframe_url,
                    "width": "100%",
                    "height": "300"
                }
            }
        else:
            message = "Sorry, I couldn't find the video you were looking for"

        dispatcher.utter_message(message)

        return []
class ActionDefaultFallback(Action):
  
    def name(self) -> Text:
        return "action_default_fallback"
    def run(self, dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        URL = "https://api.openai.com/v1/chat/completions" 
        response= requests.post(URL, headers={ "Authorization": "Bearer " +  "sk- TrErq2pkBqIjwhHRegCKT3BlbkFJGlDVUKBIn1U2dxcDbFNH"})
        print(response.json())

        dispatcher.utter_message(text=response.json())
      



    
    




