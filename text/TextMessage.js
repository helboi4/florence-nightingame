import { RevealingText } from "./RevealingText.js";
import {KeyPressListener} from "../utils/KeyPressListener.js"

export class TextMessage{
    constructor({text, onComplete}) {
        this.text = text;
        this.onComplete = onComplete;
        this.element = null;
    }

    //TODO: If this functionality is needed, watch the rest of the video and get it to work fully

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("TextMessage");

        this.element.innerHTML = (
            `<p class="TextMessage_p"></p>
            <button class="TextMessage_button">Next</button>`
        )

        //Typewriter 
        this.revealingText =  new RevealingText({
            element: this.element.querySelector(".TextMessage_p"),
            text: this.text,
        })

        this.element.querySelector("button").addEventListener("click", () => {
            //Close the text message
            this.done();
            this.onComplete;
        })
        
        this.actionListener = new KeyPressListener("Enter", () => {
            this.done()
        })

    }

    done(){
        if(this.revealingText.isDone){
            this.actionListener.unbind();
            this.element.remove();
            this.onComplete()
        } else {
            this.revealingText.warpToDone();
        }
    }

    init(container){
        this.createElement();
        container.appendChild(this.element)
        this.revealingText.init();
    }
}