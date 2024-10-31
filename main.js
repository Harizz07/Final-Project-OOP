
function buttonClicked() {
    var city = document.getElementById("city_input").value;

    for (let i = 1; i <= 12; i++) {
        document.getElementById(`demo${i}`).innerHTML = ""; 
    }
    document.getElementById("likeButton").style.display = "none"; 

    fetch(`https://restcountries.com/v3.1/capital/${city}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.length > 0) {
                console.log(data);

                document.getElementById("demo1").innerHTML = `We are in ${data[0].name.common}`;
                document.getElementById("demo5").innerHTML = `which holding capital city of ${data[0].capital}`;

                const currencies = data[0].currencies;
                const currencyDisplay = currencies ? Object.values(currencies).map(currency => `${currency.name} (${currency.symbol})`).join(', ') : 'N/A';
                document.getElementById("demo6").innerHTML = `The currency they use is ${currencyDisplay}`;

                const flag = data[0].flags && data[0].flags.png ? data[0].flags.png : '';
                const coatOfArms = data[0].coatOfArms && data[0].coatOfArms.png ? data[0].coatOfArms.png : '';

                document.getElementById("flagImage").src = flag;
                document.getElementById("coatOfArmsImage").src = coatOfArms;

                document.getElementById("flagImage").style.display = flag ? 'block' : 'none';
                document.getElementById("coatOfArmsImage").style.display = coatOfArms ? 'block' : 'none';

                const borders = data[0].borders || [];
                if (borders.length > 0) {
                    document.getElementById("demo12").innerHTML = `Some of the countries nearby is: ` + borders.map(country => `<a href="#" onclick="getNearbyCountry('${country}')">${country}</a>`).join(", ");
                } else {
                    document.getElementById("demo12").innerHTML = `No nearby countries found.`;
                }

                document.getElementById("likeButton").style.display = "inline-block";
                document.getElementById("likeButton").setAttribute("data-country", data[0].name.common);
            } else {
                for (let i = 1; i <= 11; i++) {
                    document.getElementById(`demo${i}`).innerHTML = "Error: No country found for the given city.";
                }
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            for (let i = 1; i <= 11; i++) {
                document.getElementById(`demo${i}`).innerHTML = "Error: Could not retrieve data. Please check the city name.";
            }
        });

    document.getElementById("city_input").value = "";
    document.getElementById("city_input").focus(); 
    
}

function getNearbyCountry(countryCode) {
    fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.length > 0) {
                console.log(data);

                document.getElementById("demo1").innerHTML = `We are in ${data[0].name.common}`;
                document.getElementById("demo5").innerHTML = `which holding capital city of ${data[0].capital}`;

                const currencies = data[0].currencies;
                const currencyDisplay = currencies ? Object.values(currencies).map(currency => `${currency.name} (${currency.symbol})`).join(', ') : 'N/A';
                document.getElementById("demo6").innerHTML = `The currency they use is ${currencyDisplay}`;

                const flag = data[0].flags && data[0].flags.png ? data[0].flags.png : '';
                const coatOfArms = data[0].coatOfArms && data[0].coatOfArms.png ? data[0].coatOfArms.png : '';

                document.getElementById("flagImage").src = flag;
                document.getElementById("coatOfArmsImage").src = coatOfArms;

                document.getElementById("flagImage").style.display = flag ? 'block' : 'none';
                document.getElementById("coatOfArmsImage").style.display = coatOfArms ? 'block' : 'none';

                const borders = data[0].borders || [];
                if (borders.length > 0) {
                    document.getElementById("demo12").innerHTML = `Some of the countries nearby is: ` + borders.map(country => `<a href="#" onclick="getNearbyCountry('${country}')">${country}</a>`).join(", ");
                } else {
                    document.getElementById("demo12").innerHTML = `No nearby countries found.`;
                }

                document.getElementById("likeButton").style.display = "inline-block";
                document.getElementById("likeButton").setAttribute("data-country", data[0].name.common);
            } else {
                for (let i = 1; i <= 11; i++) {
                    document.getElementById(`demo${i}`).innerHTML = "Error: No country found for the given code.";
                }
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            for (let i = 1; i <= 11; i++) {
                document.getElementById(`demo${i}`).innerHTML = "Error: Could not retrieve data. Please check the country code.";
            }
        });

    document.getElementById("city_input").value = "";
    document.getElementById("city_input").focus(); 
}


document.getElementById("likeButton").addEventListener("click", addToFavorites);

function addToFavorites() {
    const country = document.getElementById("likeButton").getAttribute("data-country");
    if (country) {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (!favorites.includes(country)) {
            favorites.push(country);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            alert(`${country} added to favorites!`);
        } else {
            alert(`${country} is already in your favorites!`);
        }
    }
}
function showRegionInfo(region) {
    const info = {
        "Africa": "Africa is the second largest continent, known for its rich cultural heritage and biodiversity.",
        "Asia": "Asia is the largest continent, home to diverse cultures and the world's highest population.",
        "Europe": "Europe has a rich history, famous for art, science, and modern development.",
        "North America": "North America is known for its natural beauty and highly developed nations.",
        "South America": "South America is famous for the Amazon rainforest and vibrant cultures.",
        "Oceania": "Oceania includes Australia, New Zealand, and many Pacific Islands."
    };

    document.getElementById("regionInfo").innerHTML = `<h3>${region}</h3><p>${info[region]}</p>`;
}
