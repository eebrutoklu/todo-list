let inputItem = document.querySelector('#task');
const ulDOM = document.querySelector('#list');
let allLiDOM = document.querySelectorAll("li");

let closeButton = `<button   
onclick="removeElement(parentNode)" 
style="padding: 13px;" type="button" 
class="close" 
data-dismiss="toast"
aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>` //x butonu ekleme

function removeElement(erase) { // x button aktivasyonu
    erase.remove();            
    eraseStrorage(erase);       
}

function markElement(){  // işaretleme işlemi
    this.classList.toggle("checked");
}

allLiDOM.forEach(e => {  //x butonunun tüm listlerde kullanılması
        e.addEventListener("click", markElement);
        e.innerHTML += `${closeButton}`;
    })

function newElement(){ //alert mesajlarını gösterir
    if(inputItem.value.trim() != ""){
        let liDOM = document.createElement('li');     
        liDOM.innerHTML = `${inputItem.value}${closeButton}`;
        liDOM.addEventListener("click", markElement);
        ulDOM.appendChild(liDOM);
        $('.success').toast("show");
        setStrorage();
        inputItem.value = '';
    }
    
    else{
        $('.error').toast("show"); 
    }
}

let toDoList = JSON.parse(localStorage.getItem("toDoList"));
toDoList = [];
localStorage.setItem("toDoList", JSON.stringify(toDoList));

function setStrorage(){
    let toDoList = JSON.parse(localStorage.getItem("toDoList"));   // toDoList ls'sini array'a çevirip olarak çağırma.
    toDoList.push(`${inputItem.value}`);                             // input'a girdiğimiz yazıyı toDoList array'ine ekleme.
    localStorage.setItem("toDoList", JSON.stringify(toDoList));    // toDoList'i tekrar string'e çevirip ls'ye yollama.
}

function eraseStrorage(erase){
    let toDoList = JSON.parse(localStorage.getItem("toDoList"));    // toDoList ls'sini array'a çevirip olarak çağırma.
    if (toDoList.includes(erase.firstChild.textContent) == true) {  // toDoList array'i listeye yazdığımız metini içeriyorsa
        let indexbul = toDoList.findIndex(e =>                      // Bu metinin(array'in elemanı) index nosunu buluyoruz.
            e == erase.firstChild.textContent
            );
        toDoList.splice(indexbul, 1);                               // index nosundan kendisini bulup array'den siliyoruz.
        localStorage.setItem("toDoList", JSON.stringify(toDoList)); // toDoList'i tekrar string'e çevirip ls'ye yolladık.
    } 
}