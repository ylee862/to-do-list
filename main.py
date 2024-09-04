#Yedam Lee
#Backend codes 

#fastAPI is a python framework
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

#memo entity, the format of the interface
class ToDo(BaseModel):
    id:str
    content:str
    
    
#memos array
memos = []

#what we are executing
app = FastAPI()

#connecting our program to the server
#C in CRUD, creating
@app.post("/memos")
def create_memo(memo:ToDo):
    memos.append(memo)
    return 'The thoughts have been sent.'

#R in CRUD, reading
@app.get("/memos")
def read_memo():
    return memos;

#U in CRUD, updating
@app.put("/memos/{memo_id}")
def put_memo(req_memo:ToDo):
    for memo in memos:
        
        #if two ids match
        if memo.id == req_memo.id:
            
            #changing the memo to new input
            memo.content = req_memo.content
            return 'successfully updated.'
        
    return 'there is no such memo.'

#D in CRUD, deleting
@app.delete("/memos/{memo_id}")
def del_memo(memo_id):
    
    #finding the specific id we need to delete
    #enumerate takes out both of the index and memo element from memos
    for index, memo in enumerate(memos):
        
        #if two ids match
        if memo.id == memo_id:
            
            #removing
            memos.pop(index)

            return 'successfully updated.'
        
    return 'there is no such memo.'
    

app.mount("/", StaticFiles(directory='static', html=True), name='static')

