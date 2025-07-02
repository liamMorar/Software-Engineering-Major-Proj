var searchInput = document.getElementById('searchInput');
var tagContainer = document.getElementById('tagContainer');
var results = document.getElementById('results');
var disorderDetails = document.getElementById("disorderDetails");
var disorderId = new URLSearchParams(window.location.search).get("id");

if (searchInput) {
    searchInput.addEventListener('input', () => {
        fetch(`server.php?search=${searchInput.value}`)
            .then(res => res.json())
            .then(data => {
                results.innerHTML = data.map(dat =>
                    '<div><a href="disorder.html?id=' + dat.id + '">' + dat.name + '</a></div>'
                ).join('');
            });
    });
}

if (tagContainer) {
    fetch(`server.php?tags=1`)
        .then(res => res.json())
        .then(tags => {
            tagContainer.innerHTML = tags.map(tag =>
                `<span onclick="fitlerTag('${tag}')">${tag}</span>`
            ).join('');
        });
}

function fitlerTag(tag) {
    fetch(`server.php?tag=${tag}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('results').innerHTML = data.map(dat =>
                '<div><a href="disorder.html?id=' + dat.id + '">' + dat.name + '</a></div>'
            ).join('');
        });
}


document.addEventListener('DOMContentLoaded', () => {
    if(disorderId) {
        fetch("server.php?getDisorder=" + disorderId)
            .then(response => response.json())
            .then(data => {
                window.dat = data;
                console.log(data)
                document.getElementById("disorderTitle").innerHTML = data.name;
                document.getElementById("disorderDescription").innerHTML = data.description;

                const tagsContainer = document.getElementById("disorderTags");
                tagsContainer.innerHTML = '';
                data.tags.forEach(tag => {
                    const span = document.createElement("span");
                    span.className = "tag";
                    span.innerHTML = tag;
                    tagsContainer.appendChild(span);
                });
            })
            .catch(err => {
                console.log(err);
                disorderDetails.innerHTML = "<p>No disorder ID provided.</p>";
            });
    } else {
        disorderDetails.innerHTML = "<p>No disorder ID provided.</p>";
    }
})

//reusablehtmlcode
document.addEventListener("DOMContentLoaded", function () {
    fetch("reusable/header.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("header").innerHTML = data;
        });
    fetch("reusable/footer.html")
        .then((response) => response.text())
        .then((data) => {
            //document.getElementById("footer").innerHTML = data;
        });
});

if (document.getElementById('editBtn')) {
    document.getElementById('editBtn').addEventListener('click', () => {
        document.getElementById('disorderDescription').toggleAttribute('contenteditable');
        document.getElementById('disorderDescription').addEventListener('change', () => {

        })
    })
}

function login(username, password) {
    const params = new URLSearchParams();
    params.append('login', '1');
    params.append('username', username);
    params.append('password', password);

    return fetch('server.php', {
        method: 'POST',
        body: params
    })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                console.log('Login successful');
                window.location.href = 'index.html';
            } else {
                console.warn('Login failed:', data.message);
            }
            return data;
        })
        .catch(err => {
            console.error('Login error:', err);
            throw err;
        });
}

function register(username, email, password) {
    const params = new URLSearchParams();
    params.append('register', '1');
    params.append('username', username);
    params.append('password', password);
    params.append('email', email);

    return fetch('server.php', {
        method: 'POST',
        body: params
    })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                console.log('Registration successful');
                // redirect if you like:
                // window.location.href = 'index.html';
            } else {
                console.warn('Registration failed:', data.message);
            }
            return data;
        })
        .catch(err => {
            console.error('Registration error:', err);
            throw err;
        });
}