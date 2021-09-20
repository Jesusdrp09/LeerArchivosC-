var elemento = document.getElementById('contenido-archivo');
let p = document.createElement("P");
let palabrasReservadasDoble = ["==", "!=", "&&", "||", "\\t", "\\n", "\\r", ">>", "<<", ">=", "<=", "<>"]
let palabrasReservadas = ["asm", "auto", "bool", "break", "case", "catch", "char", "class", "const", 
"const_cast", "continue", "default", "delete","do", "double", "dynamic_cast", "else", "enum", "explicit", 
"extern", "false", "float", "for", "friend", "goto", "if", "inline",  "int", "long", "mutable", "namespace", 
"new", "operator", "private", "protected", "public", "register", "reinterpret_cast", "return", "short", 
"signed", "sizeof", "static", "static_cast", "struct", "switch","template", "this", "throw", "true", "try", 
"typedef", "typeid", "typename", "union","unsigned","using","virtual","void","volatile", "while", "==", "!=",
"#", `"`, "'", "+", "-", "*", "/", "%", "&&", "=", "!", "(", ")", "\\t", "\\n", "\\r", ";", "{", "}", "[", "]",
",", ">>", "<<", ":", ">=", "<=", "<>"]
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
        tamano = vector[i].length;
        for(j = 0; j < tamano; j++){
          cadena = vector[i].substring(0, j);
          if(vector[i].substring(j, j+2) == "//"){
            j += tamano;
          }
        }
        vector[i] = cadena;
      }
      aux += vector[i];
    }

    for(i = 0; i < aux.length; i++){
      if((aux.substring(i, i+1) == "<" || aux.substring(i, i+1) == ">") && (!palabrasReservadasDoble.includes(aux.substring(i, i+2))
        && !palabrasReservadasDoble.includes(aux.substring(i-1, i+1)))){
          aux = " " + aux.substring(0, i) + " " + aux.substring(i, i+1) +" " + aux.substring(i+1, aux.length);
          i = i+2;
        }
      if(aux.substring(i, i+2) == "/*"){
        contador = i;
        i++;
        do{
          i++;
        }while(aux.substring(i, i+2) != "*/" && i < aux.length);
        contador2 = i+2;
        aux = aux.substring(0, contador) + aux.substring(contador2, aux.length)
      }
    }

    vector = aux.split(" ");
    for(i = 0; i < vector.length; i++){
      tamano = vector[i].length;
      for(j = 0; j < tamano; j++){
        if((palabrasReservadas.includes(vector[i].charAt(j)) && !palabrasReservadasDoble.includes(vector[i].charAt(j)+vector[i].charAt(j+1))
          && !palabrasReservadasDoble.includes(vector[i].charAt(j-1)+vector[i].charAt(j)))){
          vector[i] = vector[i].substring(0,j) + "<br>" + vector[i].substring(j,j+1) + "<br>" + vector[i].substring(j+1,vector[i].length);
          j+= 8;
          tamano = vector[i].length;
        }
      }
    }

    for(i = 0; i < vector.length; i++){
      tamano = vector[i].length;
      for(j = 0; j < tamano; j++){
        if(palabrasReservadasDoble.includes(vector[i].substring(j, j+2)) || palabrasReservadasDoble.includes(vector[i].substring(j-2, j))){
          vector[i] = vector[i].substring(0,j) + "<br>" + vector[i].substring(j,j+2) + "<br>" + vector[i].substring(j+2,vector[i].length);
          j+= 9;
          tamano = vector[i].length;
        }
      }
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