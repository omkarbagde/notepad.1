const addButton = document.querySelector("#addButton");
const main = document.querySelector("#main");



const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea");
    const data = [];

    // it will iterate to the data present in all notes
    notes.forEach(
        (note) => {
            data.push(note.value); // it will save notes text in data object
        }
    ) 
    // console.log(data);
    // if there in no notes left, then delete database
    if(data.length === 0)
    {
        localStorage.removeItem("notes");
    }
    else // else store data in local storage in form of JSON
    {
        localStorage.setItem("notes", JSON.stringify(data));
    }
}

addButton.addEventListener("click", function(){
    addNote()
});

const addNote = (text = "") => {
    const note = document.createElement("div"); // it will create new div class
    note.classList.add("note"); // to add newly created class in class list

    // it is for creating new note
    note.innerHTML = `
    <div class="tool">
    <i class="trash fas fa-trash"></i>
    <i class="save fas fa-save"></i>
    </div>
    <textarea>${text}</textarea>
    `;

    note.querySelector(".trash").addEventListener("click", function(){
        note.remove() // it will remove note
        saveNotes();
    })

    // to save note
    note.querySelector(".save").addEventListener("click", function(){
        saveNotes()
    })

    // if cursor goes out of the teaxtarea then note automatically saved
    note.querySelector("textarea").addEventListener("focusout", function(){
        saveNotes()
    })

    main.appendChild(note);
    saveNotes()
}


// this function will run automatically 
(
    function(){
        const lsnotes = JSON.parse(localStorage.getItem("notes"));

        if(lsnotes === null) // if the all notes are deleted, then there should be at least one initial note
        {
            addNote();
        }
        else // this is for aftter refreshing page, we will add new node and put data in it 
        {
            lsnotes.forEach(
                (lsnote) => {
                    addNote(lsnote);
                }
            )
        }
    }
)();