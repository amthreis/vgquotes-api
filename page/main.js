async function doIt() {
    try {
        const response = await fetch("/api");
    
        if (response.status === 429) {
            loading.textContent = "Too many requests!";

            setTimeout(() => doIt(), 2000);
            return;
        }
    
        const items = await response.json();

        for(let it of items) {
            content.innerHTML += renderCard(it);
        }

        loading.hidden = true;
        content.hidden = false;
    }
    catch(err) {
        console.log("Error: ", err);
        loading.textContent = err.message;
    }
}

function renderCard(item) {
    return `
    <div class="card">
            <img src=${ item.portraitUrl } width="48px" height="48px" alt="">
            <div class="cardContent">
                <h3>${ item.character } (${ item.createdAt })</h3>
                <p>${ item.quote }</p>
            </div>
        </div>`;
}

const loading = document.getElementById("loading");
const content = document.getElementById("content");

window.onload = doIt;