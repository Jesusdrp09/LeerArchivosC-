var elemento = document.getElementById('contenido-archivo');
let p = document.createElement("P");
function leerArchivo(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
      return;
    }
    var lector = new FileReader();
    lector.onload = function(e) {
      var contenido = e.target.result;
      mostrarContenido(contenido);
    };
    lector.readAsText(archivo);
  }
  
  function mostrarContenido(contenido) {
    let vector = contenido.split("\n");
    let aux;

    for(i = 0; i < vector.length; i++){
      vector[i] = vector[i].replaceAll("\t", "");
      vector[i] = vector[i].replaceAll("\r", "");
      if(vector[i].includes("//")){
        for(j = i; j < vector.length-1; j++){
          vector[j] = vector[j+1];
        }
      }
      aux += vector[i];
    }

    vector = aux.split(" ");
    for(i = 0; i < vector.length; i++){
      vector[i] = vector[i].replaceAll(";","<br>"+";"+"<br>");
      vector[i] = vector[i].replaceAll("#","<br>"+"#"+"<br>");
      vector[i] = vector[i].replaceAll(`"`,"<br>"+`"`+"<br>");
      vector[i] = vector[i].replaceAll(`(`,"<br>"+`(`+"<br>");
      vector[i] = vector[i].replaceAll(`)`,"<br>"+`)`+"<br>");
      vector[i] = vector[i].replaceAll(`}`,"<br>"+`}`+"<br>");
      vector[i] = vector[i].replaceAll(`{`,"<br>"+`{`+"<br>");
      vector[i] = vector[i].replaceAll(`<<`,"<br>"+`<<`+"<br>");
      vector[i] = vector[i].replaceAll(`>>`,"<br>"+`>>`+"<br>");
      vector[i] = vector[i].replaceAll(`\t`,"");
      vector[i] = vector[i].replaceAll('\\',"<br>"+`\\`+"<br>");
      vector[i] = vector[i].replaceAll(`*`,"<br>"+`*`+"<br>");
      vector[i] = vector[i].replaceAll(`!=`,"<br>"+`!=`+"<br>");
      vector[i] = vector[i].replaceAll(`==`,"<br>"+`==`+"<br>");
      vector[i] = vector[i].replaceAll(`%`,"<br>"+`%`+"<br>");
      vector[i] = vector[i].replaceAll(`&&`,"<br>"+`&&`+"<br>");
      vector[i] = vector[i].replaceAll(`||`,"<br>"+`||`+"<br>");
      vector[i] = vector[i].replaceAll(`+`,"<br>"+`+`+"<br>");
      vector[i] = vector[i].replaceAll(`-`,"<br>"+`-`+"<br>");
      vector[i] = vector[i].replaceAll(`,`,"<br>"+`,`+"<br>");
      vector[i] = vector[i].replaceAll(`:`,"<br>"+`:`+"<br>");
      vector[i] = vector[i].replaceAll(`/`,"<br>"+`/`+"<br>");
      vector[i] = vector[i].replaceAll(`.`,"<br>"+`.`+"<br>");
      vector[i] = vector[i].replaceAll(`AND`,"<br>"+`AND`+"<br>");
      vector[i] = vector[i].replaceAll(`=`,"<br>"+`=`+"<br>");
    }
    
    for(i = 0; i < vector.length; i++){
      elemento.innerHTML += vector[i] + "<br>";
    }
    texto = elemento.innerHTML;
    texto = texto.split("<br>");
    aux = [];
    for(i = 0; i < texto.length; i++){
      if(texto[i] != "" & texto[i] != " "){
        aux.push((texto[i]));
      }
    }
    elemento.innerHTML = "";
    for(i = 0; i < aux.length; i++){
      elemento.innerHTML += `[${aux[i]}]   `;
    }
    let p = document.getElementById("p");
    p.innerHTML += `<br>${elemento.innerHTML}`;
    elemento.innerHTML = "";
    
  }
  
 let cargar = document.getElementById('cargar')
cargar.addEventListener('change', leerArchivo, false);






