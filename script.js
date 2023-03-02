document.querySelector('#newGames').addEventListener('click', (event) => {
    document.querySelector('#collapseContainer1').style.display = "none";
    document.querySelector('#collapseContainer3').style.display = "none";
    document.querySelector('#collapseContainer2').style.display = "inline-flex";

})

document.querySelector('#start').addEventListener('click', (event) => {
    document.querySelector('#collapseContainer2').style.display = "none";
    document.querySelector('#collapseContainer3').style.display = "inline";
})

document.querySelector('#btnRetry').addEventListener('click', (event) => {
    document.querySelector('#collapseContainer3').style.display = "none";
    document.querySelector('#collapseContainer2').style.display = "inline-flex";
})