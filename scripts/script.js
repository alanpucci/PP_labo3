import Anuncio_Mascota from "./anuncioMascota.js";
import {$, create, obtenerLista} from './utils.js'

const $form = document.getElementsByTagName("form")[0];

const onLoad = () => {
    handleForm();
    cargando();
}

const handleForm = () => {
    $form.addEventListener('submit', e => {
        e.preventDefault();
        const {txtTitulo, txtDesc, txtPrecio, rdoAnimal, txtId, txtRaza, fecha, vacuna} = $form;
        const anuncio = new Anuncio_Mascota(txtId.value,txtTitulo.value,null,txtDesc.value, txtPrecio.value, rdoAnimal.value, txtRaza.value, fecha.value, vacuna.value);
        if(anuncio.id==""){
            anuncio.id = obtenerMaxId();
            handleCreate(anuncio);
        }
        $form.reset();
    })
}

const obtenerMaxId = () => {
    const lista = obtenerLista();
    lista.sort((a,b) => a-b);
    return parseInt(lista[lista.length-1]?.id)+1 || 1;
}

const handleCreate = anuncio => {
    const lista = obtenerLista();
    lista.push(anuncio);
    actualizarLocalStorage(lista);
    cargando();
}


const crearThead = (item) => {
    const $thead = create("thead");
    const $tr = create("tr");
    for(const key in item){
        if(key!="id"){
            const $th = create("th");
            $th.textContent = key;
            $tr.appendChild($th);
        }
    }
    $thead.appendChild($tr);
    return $thead;
}

const crearTbody = (lista) => {
    const $tbody = create("tbody");
    lista.forEach((element,index) => {
        const $tr = create("tr");
        for(const key in element){
            if(key=="id"){
                $tr.setAttribute("id",element[key]);
            }else{
                const $td = create("td");
                $td.textContent = element[key];
                $tr.appendChild($td);
            }
        }
        if(index%2){
            $tr.style.opacity = "0.75"
        }
        $tbody.appendChild($tr);
    });
    return $tbody;
}

const crearTabla = (lista) => {
    const $tabla = $('tabla');
    $tabla.appendChild(crearThead(lista[0]));
    $tabla.appendChild(crearTbody(lista));
}

const actualizarTabla = () => {
    const $tabla = $('tabla');
    let data = obtenerLista();
    while($tabla.hasChildNodes()){
        $tabla.removeChild($tabla.firstElementChild);
    }
    if(data){
        data.sort((a,b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0))
        crearTabla(data);
    }
}

const actualizarLocalStorage = lista => {
    localStorage.setItem("lista", JSON.stringify(lista))
}

const cargando = () => {
    $('spinner').style.display = "flex";
    setTimeout(() => {
            $('spinner').style.display = "none";
        actualizarTabla();
    }, 3000);
}

onLoad();