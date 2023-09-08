let currentPageUrl='https://rickandmortyapi.com/api/character';


window.onload= async()=>{
    try{
        await loadCharacthers(currentPageUrl);
    }catch(error){

        console.log(error);
        window.alert('Ocorreu um erro ao carregar Cards');
    }
  
 const nextButton=document.getElementById('next-button');
 const backButton=document.getElementById('back-button');

 nextButton.addEventListener('click', loadNextPage);
 backButton.addEventListener('click', loadPreviousPage);

 


}


async function loadCharacthers(url){
const mainContent=document.getElementById('main-content');
mainContent.innerHTML='';

try{
 const response=await fetch(url);
const responseJson=await response.json();

responseJson.results.forEach((personagens)=>{
    const card=document.createElement('div');
    card.style.backgroundImage=`url('https://rickandmortyapi.com/api/character/avatar/${personagens.url.replace( /\D/g, "")}.jpeg')`
    card.className='cards';
    

    const characterNameBG=document.createElement('div');
    characterNameBG.className='character-name-bg';

    const characterName=document.createElement('div');
    characterName.className='character-name';
    characterName.innerText=`${personagens.name}`;

   
    characterNameBG.appendChild(characterName);
    card.appendChild(characterNameBG);

    card.onclick=()=>{
        const modal=document.getElementById('modal');
        modal.style.visibility='visible';

        const modalContent=document.getElementById('modal-content');
        modalContent.innerHTML='';

        const characterImage=document.createElement('div');
        characterImage.style.backgroundImage=`url('https://rickandmortyapi.com/api/character/avatar/${personagens.url.replace( /\D/g, "")}.jpeg')`;
        characterImage.className='character-image';

        const nome=document.createElement('span');
        nome.className='character-details';
        nome.innerText=`nome: ${personagens.name}`;

        const status=document.createElement('span');
        status.className='character-details';
        status.innerText=`status: ${personagens.status}`;

        const especie=document.createElement('span');
        especie.className='character-details';
        especie.innerText=`especie: ${personagens.species}`;

        const genero=document.createElement('span');
        genero.className='character-details';
        genero.innerText=`genero: ${personagens.gender}`;

        const local=document.createElement('span');
        local.className='character-details';
        local.innerText=`origem: ${personagens.location.name}`;

        
        modalContent.appendChild(characterImage);
        modalContent.appendChild(nome);
        modalContent.appendChild(status);
        modalContent.appendChild(especie);
        modalContent.appendChild(genero);
        modalContent.appendChild(local);



    }

    mainContent.appendChild(card);


});

const nextButton=document.getElementById('next-button');
const backButton=document.getElementById('back-button');

nextButton.disabled= !responseJson.info.next;
backButton.disabled= !responseJson.info.prev;
backButton.style.visibility= responseJson.info.prev? "visible" : "hidden";



currentPageUrl=url;

}catch(error){
    window.alert('Erro ao carregar os personagens');
    console.log(error);

}



}


async function loadNextPage(){
    if(!currentPageUrl) return;

    try{
        const response=await fetch(currentPageUrl);
        const responseJson=await response.json();
        await loadCharacthers(responseJson.info.next);
    }catch(error){
        console.log(error);
        window.alert('Erro ao carregar a próxima pagina');
       
    }
   
}


async function loadPreviousPage(){
    if(!currentPageUrl) return;
    try{
        const response=await fetch(currentPageUrl);
        const responseJson=await response.json();
        await loadCharacthers(responseJson.info.prev);
    }catch(error){
        console.log(error);
        window.alert('Erro ao carregar a pagina anterior');
       
    }
    


}

function hideModal(){
const modal=document.getElementById('modal');
modal.style.visibility='hidden';





}




