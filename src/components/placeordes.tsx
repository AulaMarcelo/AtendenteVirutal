"use client"
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import { chat, prompt } from "@/helper/gemini";
import { useState } from "react";
import { chatI } from "@/interfaces/chat/interface";
import { comma } from "postcss/lib/list";

function PlaceOrders() {
    const [command,setCommand] = useState('')
    const [geminiResponse,setGeminiResponse] = useState<chatI[]>([])
    
   async function run(){
        setGeminiResponse(prev=> [...prev,{
            userType:"user",
            text:command,
        }])
        setCommand('')
        const result = await chat.sendMessage(prompt + command);
        const response = await result.response;
        const text = response.text();
        setGeminiResponse(prev=> [...prev,{
            userType:"Atendente",
            text:text
        }])
    if(command.toLocaleLowerCase() === "encerrar"){
        setGeminiResponse([]);
        setCommand('');
    }
   }
   function handleTextAreaKeyPress(event:React.KeyboardEvent<HTMLTextAreaElement>){
    if(event.key == "Enter" && !event.shiftKey){
        event.preventDefault();
        run();
    }
   }
    return (  
        <>
        <div className="flex flex-col items-center w-full mt-5 gap-5">
            <h1>Digite seu pedido</h1>
            <Textarea 
            onChange={(e) => setCommand(e.target.value)}
            value={command}
            onKeyDown={handleTextAreaKeyPress}
            />
            <Button variant="outline" onClick={run}><SendHorizonal /></Button>
        </div>
        <div className="flex flex-col w-full mt-5 gap-2 border p-4 min-h-64 ">
          {geminiResponse.slice().reverse().map((item,key) =>(
            <div key={key} className="flex">
                <p className="font-bold text-white/80 text-start">
                    <span className="font-bold text-blue-400">{item.userType}: </span>
                    <span dangerouslySetInnerHTML={{__html:item.text.replace(/\n/g, '<br>')}}></span>
                </p>
            </div>
          ))}
            
        </div>
        </>
    );
}

export default PlaceOrders

