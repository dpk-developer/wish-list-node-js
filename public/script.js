function deleteItems(item) {
    const url = "http://localhost:8080/remove/" + item.innerText;

    fetch(url, {
        method: "delete",

    }).then(res => res.json())
        .then(res2 => {
            location.reload();
        });

}

document.getElementById("myForm").onsubmit = (e) => {
    e.preventDefault();
    const url = "http://localhost:8080/sent";

    var data = new URLSearchParams();
    for (const pair of new FormData(e.target)) {
        data.append(pair[0], pair[1])
    }

    fetch(url, {
        method: "post",
        body: data,

    }).then(res => res.json())
        .then(res2 => {
            location.reload();
        });

}