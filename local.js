currentPageUrl='https://rickandmortyapi.com/api/location';


window.onload=async()=>{
    try{
        await loadLocations(currentPageUrl);

    }catch(error){
        console.log(error);
        window.alert('Ocorreu um erro ao rodar os Cards');

    }

    const nextButton=document.getElementById('next-button');
    const backButton=document.getElementById('back-button');

    nextButton.addEventListener('click', nextLoadLocals);
    backButton.addEventListener('click', previousLoadLocals);

}


async function loadLocations(url){
    const mainContent=document.getElementById('main-content');
    mainContent.innerHTML='';

    try{
        const response=await fetch(url);
        const responseJson=await response.json();

        responseJson.results.forEach((locais)=>{
            const card=document.createElement('div');
     
            card.style.backgroundImage="url('https://i.redd.it/8aptpz9jf6081.png')";
          
            card.className='cards';

            const characterNameBg=document.createElement('div');
            characterNameBg.className='character-name-bg';
            
            const characterName=document.createElement('div');
            characterName.className='character-name';
            characterName.innerText=`${locais.name}`;

            characterNameBg.appendChild(characterName);
            card.appendChild(characterNameBg);

            card.onclick=()=>{
                const modal=document.getElementById('modal');
                modal.style.visibility='visible';

                const modalContent=document.getElementById('modal-content');
                modalContent.innerHTML='';

                const localImage=document.createElement('div');
                localImage.style.backgroundImage="url('https://i.redd.it/8aptpz9jf6081.png')";
                localImage.className='character-image';

                const nome=document.createElement('span');
                nome.className='character-details';
                nome.innerText=`nome: ${locais.name}`;

                const tipo=document.createElement('span');
                tipo.className='character-details';
                tipo.innerText=`tipo: ${locais.type}`;

                const dimensao=document.createElement('span');
                dimensao.className='character-details';
                dimensao.innerText=`dimension: ${locais.dimension}`;

                modalContent.appendChild(localImage);
                modalContent.appendChild(nome);
                modalContent.appendChild(tipo);
                modalContent.appendChild(dimensao);

            }



            mainContent.appendChild(card);
            

        });

        const nextButton=document.getElementById('next-button');
        const backButton=document.getElementById('back-button');
        
        nextButton.disable=!responseJson.info.next;
        backButton.disable=!responseJson.info.prev;
        backButton.style.visibility=responseJson.info.prev? 'visible' : 'hidden';

        currentPageUrl=url;

    }catch(error){
        console.log(error);
        window.alert('Ocorreu um erro ao rodar os Cards');
    }




}

async function nextLoadLocals(){
    if(!currentPageUrl) return;

    try{
    const response= await fetch(currentPageUrl);
    const responseJson=await response.json();
    await loadLocations(responseJson.info.next);
    }catch(error){
        console.log(error);
        window.alert('Erro ao carregar a próxima pagina');
    }


    
}

async function previousLoadLocals(){
    if(!currentPageUrl) return;

    try{
        const response= await fetch(currentPageUrl);
        const responseJson=await response.json();
        await loadLocations(responseJson.info.prev);
    }catch(error){
        console.log(error);
        window.alert('Erro ao carregar a pagina anterior');
    }
   
    

    
}


function hideModal(){
    const modal=document.getElementById('modal');
    modal.style.visibility='hidden';

}