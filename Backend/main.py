from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from decouple import config
import openai
import os


app = FastAPI()

# Enable CORS to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

openai.organization = config('OPEN_AI_ORG')
openai.api_key = config('OPEN_AI_KEY')



@app.get("/")
async def root():
    return {"message": "Hello World"}



@app.post('/createImg')
async def createImg(request: Request):
        
        data = await request.json()
        userInput = data.get('userInput')  # Retrieve userInput from the JSON payload

        response = openai.images.generate(
        model="dall-e-3",
        prompt= userInput,
        size="1024x1024",
        quality="standard",
        n=1,
        )

        image_url = response.data[0].url
        print(image_url)
    
        if not image_url:
            return HTTPException(status_code=400, detail='failed to get openai response')
        
        return {"image_url": image_url if image_url else ""}
        

            
@app.options('/createImg')
async def options_createImg():
    return {"Allow": "POST"}




@app.post('/variation')
async def variation():

    response = openai.images.create_variation(
    image=open("image_edit_original.png", "rb"),
    n=2,
    size="1024x1024"
    )

    image_url = response.data[0].url
    print(image_url)

    if not image_url:
         return HTTPException(status_code=400, detail='failed to get openai response')
    

    

@app.post('/audio') 
async def transcribe():
     
    audio_file= open("/path/to/file/audio.mp3", "rb")

    transcription = openai.audio.transcriptions.create(
    model="whisper-1", 
    file=audio_file
    )
    
    print(transcription.text)
    if not transcription.text:
         return HTTPException(status_code=400, detail='failed to get openai transcription')