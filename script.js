document.querySelector('#newGames').addEventListener('click', (event) => {
    document.getElementById("collapseContainer1").style.display = "none";
    document.getElementById("collapseContainer3").style.display = "none";
    document.getElementById("collapseContainer2").style.display = "block";
})

document.querySelector('#start').addEventListener('click', (event) => {
    document.getElementById("collapseContainer2").style.display = "none";
    document.getElementById("collapseContainer3").style.display = "block";
})

document.querySelector('#btnRetry').addEventListener('click', (event) => {
    document.getElementById("collapseContainer3").style.display = "none";
    document.getElementById("collapseContainer2").style.display = "block";
})

