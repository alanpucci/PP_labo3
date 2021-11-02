const crearCard = () => {
    const lista = obtenerLista();
    lista.forEach(mascota => {
        const $card = create('div');
        const $h3 = create('h3');
        const h3Text = document.createTextNode(`${mascota.titulo}`);
        const $p = create('p');
        const pText = document.createTextNode(`${mascota.descripcion} con ${mascota.vacunas == "Si" ? "vacunas al día": "sin vacunas al día"}`);
        const $span = create('p');
        const spanText = document.createTextNode(`$ ${mascota.precio}`);
        const $button = create('button');
        const buttonText = document.createTextNode('Ver Mascota');
        const $caracteristicas = create('div');
        const $razaContainer = create('div');
        const $nacimientoContainer = create('div');
        const $vacunacionContainer = create('div');
        const $imagenRaza = create('img');
        const $razaTexto = document.createTextNode(mascota.raza);
        const $imagenNacimiento = create('img');
        const $nacimientoTexto = document.createTextNode(mascota.nacimiento);
        const $imagenVacuna = create('img');
        const $vacunaTexto = document.createTextNode(mascota.vacuna);
        $imagenRaza.src = './assets/icono_raza.png';
        $imagenRaza.classList.add('icon');
        $imagenNacimiento.src = './assets/icono_nacimiento.png';
        $imagenNacimiento.classList.add('icon');
        $imagenVacuna.src = './assets/icono_vacuna.png';
        $imagenVacuna.classList.add('icon');
        $razaContainer.appendChild($imagenRaza);
        $razaContainer.appendChild($razaTexto);
        $nacimientoContainer.appendChild($imagenNacimiento);
        $nacimientoContainer.appendChild($nacimientoTexto);
        $vacunacionContainer.appendChild($imagenVacuna);
        $vacunacionContainer.appendChild($vacunaTexto);
        $caracteristicas.appendChild($razaContainer);
        $caracteristicas.appendChild($nacimientoContainer);
        $caracteristicas.appendChild($vacunacionContainer);
        $caracteristicas.classList.add('caracteristicas');
        $caracteristicas.style.padding = '0 40px'
        $span.classList.add('precio');
        $button.appendChild(buttonText);
        $button.classList.add("card_button")
        $span.style.color = "green";
        $span.style.margin = "10px"
        $h3.appendChild(h3Text);
        $p.appendChild(pText);
        $span.appendChild(spanText);
        $card.classList.add("card");
        $card.appendChild($h3);
        $card.appendChild($p);
        $card.appendChild($span);
        $card.appendChild($caracteristicas);
        $card.appendChild($button);
        $('mascotas').appendChild($card);
    })
}

const obtenerLista = () => {
    return JSON.parse(localStorage.getItem("lista")) || [];
}

const $ = elemento => {
    return document.getElementById(elemento);
}

const create = elemento => {
    return document.createElement(elemento);
}

crearCard();