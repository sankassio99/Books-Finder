//chave da api do google: bookfinder-281522


function criaAjax(url,dados,funcao)
{
    let ajax=new XMLHttpRequest();
    ajax.onreadystatechange=funcao;
    ajax.open("GET",url+"?"+dados,true);
    ajax.send();
}
let spin ;
function buscarPorTitulo()
{
    document.querySelector('.section').innerHTML="";
    
    spin = document.querySelector("#spinner");
    spin.setAttribute("class","spinner");
    let bookName = document.querySelector('#search').value ;
    let select = document.querySelector('.select') ;
    let category = select.options[select.selectedIndex].value ;
    document.querySelector('.feed').innerHTML = "Resultados da pesquisa para "+bookName+" Categoria: "+category ;
    let dados = bookName+"+subject="+category ;
    criaAjax("https://www.googleapis.com/books/v1/volumes?q=",dados,mostrar);
}
function mostrar()
{
   
    if(this.readyState===4&&this.status===200)
    {
        let dataBook = {
            title:'',
            authors:'',
            description:[],
            imageLinks : {
                smallThumbnail:'',
                thumbnail:''
            }
        }
        document.querySelector('.section').innerHTML="";
        
        let data = JSON.parse(this.responseText); 
        //He gets a JSON object, then you should use the ResponseText.
        let title = '' ;
        spin.removeAttribute("class");
        for(let i=0; i < 5; i++){
            
            dataBook.title = data.items[i].volumeInfo.title ;
            dataBook.authors = data.items[i].volumeInfo.authors ;
            dataBook.description.push(data.items[i].volumeInfo.description) ;
            dataBook.imageLinks.smallThumbnail = data.items[i].volumeInfo.imageLinks.smallThumbnail ;
            // showTitle.innerHTML += dataBook.title ;

            createElements(dataBook);
        }
        
    }
}
function createElements(dataBook){
    let writeData = document.querySelector('.section');
    let div = document.createElement("div");
    let h2 = document.createElement("h2");
    let h5 = document.createElement("h5");
    let p = document.createElement("p");
    let img = document.createElement("img");

    div.setAttribute('class','book');
    img.setAttribute('src', dataBook.imageLinks.smallThumbnail);

    div.appendChild(img);
    div.appendChild(h2);
    div.appendChild(h5);
    div.appendChild(p);  

    let title = document.createTextNode(dataBook.title);
    let author = document.createTextNode(dataBook.authors);
    let description = document.createTextNode(dataBook.description);

    h2.appendChild(title);
    h5.appendChild(author);
    p.appendChild(description);

    console.log(div);

    writeData.appendChild(div);
    console.log("elemento criado");
}

window.onload = function(){
    document.querySelector('.btnSearch').addEventListener('click', buscarPorTitulo);
}  
        
      