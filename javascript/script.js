document.addEventListener("DOMContentLoaded", function () {
    const buscarBtn = document.getElementById("buscar");
    const apiKey = "86a5801ad71b5a72464920cfc6de6307"; // Substitua por sua chave real

    buscarBtn.addEventListener("click", function () {
        let cidade = document.getElementById("cidade").value.trim();

        if (!cidade) {
            document.getElementById("temperaturaLocal").textContent = "Por favor, insira o nome de uma cidade.";
            return;
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

        console.log("URL da requisição:", url);

        fetch(url)
            .then(response => {
                console.log("Status da resposta:", response.status);
                return response.json();
            })
            .then(data => {
                console.log("Resposta da API:", data);

                // Se a resposta da API for bem-sucedida e contiver os dados necessários
                if (data.cod === 200) {
                    let temperatura = data.main?.temp; // Verifica se "main" existe antes de acessar "temp"
                    let cidadeNome = data.name;

                    if (temperatura !== undefined) {
                        document.getElementById("temperaturaLocal").textContent = 
                            `Temperatura em ${cidadeNome}: ${temperatura}°C`;
                    } else {
                        document.getElementById("temperaturaLocal").textContent = 
                            "Não foi possível obter a temperatura. Tente novamente.";
                    }
                } else {
                    document.getElementById("temperaturaLocal").textContent = 
                        "Cidade não encontrada. Verifique o nome e tente novamente.";
                }
            })
            .catch(error => {
                console.error("Erro ao buscar temperatura:", error);
                document.getElementById("temperaturaLocal").textContent = 
                    "Erro ao buscar dados. Verifique sua conexão ou tente novamente mais tarde.";
            });
    });
});
