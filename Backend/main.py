from fastapi import FastAPI, HTTPException, Request, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from decouple import config
from starlette_prometheus import metrics, PrometheusMiddleware
import openai
import os
import tempfile


app = FastAPI()

# Enable CORS to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add Prometheus middleware to the application
app.add_middleware(PrometheusMiddleware)

openai.organization = config('OPEN_AI_ORG')
openai.api_key = config('OPEN_AI_KEY')



app.add_route("/metrics", metrics)

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
        
        return {"image_url": image_url}
        

            
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
async def transcribe(file: UploadFile = File):
    try:
       #Get speech audio from frontend 
        with open(file.filename, "wb") as buffer:
            buffer.write(file.file.read())
        audio_file = open(file.filename, "rb")

        # Transcribe audio using OpenAI
        transcription = openai.audio.transcriptions.create(
            model="whisper-1",
            file= audio_file,
        )

        transcribed_text = transcription.text
        if not transcribed_text:
            raise HTTPException(status_code=400, detail='Failed to transcribe audio')

        return {"transcribed_text": transcribed_text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    


