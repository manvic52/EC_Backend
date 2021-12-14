//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 0,
  to: 0,
  prefix: "$"
})

function setSearch() {
  let busqueda = $('#checkPersonalizada');
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
    } else {
      this.customSearch = false
    }
    $('#personalizada').toggleClass('invisible')
    $('#buscar').toggleClass('invisible')
  })
}

setSearch();

((document, window, undefined, $)=>{
  (()=>{
    return Buscador = {
      Init: function(){
        var self = this;
        self.cargaDatos();
        var $ciudad;var $tipo;var $precio=[0,0];
        $('#buscar').click(()=>{
          self.muestraDatos({'ciudad':"",'tipo':"",'precio':[0,0]})
        })
        $('#ciudad').change(()=>{
          $ciudad=$('#ciudad').val();
          if($ciudad == "Escoge una ciudad"){$ciudad=""}
        })
        $('#tipo').change(()=>{
          $tipo=$('#tipo').val();
          if($tipo == "Escoge un tipo"){$tipo=""}
        })
        $('#rangoPrecio').change(()=>{
          let precio=$('#rangoPrecio').val();
          $precio=precio.split(";")
        })
        $('#perbuscar').click(()=>{
          if(!$ciudad){$ciudad=""}
          if(!$tipo){$tipo=""}
          self.muestraDatos({'ciudad':$ciudad,'tipo':$tipo,'precio':$precio})
        })
      },
      ajaxRequest: function (url, type, data){
        return $.ajax({
              url: url,
              type: type,
              data: data
        })
      },
      cargaDatos: function(){
        var self = this;
        self.ajaxRequest('/Busqueda/datos', 'GET', {})
            .done(data=>{
              var $ciudades = $("#ciudad");
              var $tipos = $('#tipo');
              $.each(data.ciudades, (i,ciudad)=>{
                $ciudades.append(`<option value="${ciudad}">${ciudad}</option>`);
              });
              $.each(data.tipos,(i,tipo)=>{
                $tipos.append(`<option value="${tipo}">${tipo}</option>`);
              });
            })
            .fail(err=>{
              console.log(err);
            });
      },
      muestraDatos: function(filtro){
        var self = this;
        let clasificado=$('div[name="clasificado"]')
        clasificado.empty();
        let cuerpoHTML;
        var precioInmueble;
        self.ajaxRequest('/Busqueda/inmuebles','GET',{})
          .done(inmuebles=>{
            $.each(inmuebles,(i,inmueble)=>{
              cuerpoHTML=`
                <div class="card-image">
                  <img src="img/home.jpg">
                </div>
                <div class="card-stacked">
                  <div class="card-content">
                    <div>
                      <b>Direccion: </b><p>${inmueble.Direccion}</p>
                    </div>
                    <div>
                      <b>Ciudad: </b><p>${inmueble.Ciudad}</p>
                    </div>
                    <div>
                      <b>Telefono: </b><p>${inmueble.Telefono}</p>
                    </div>
                    <div>
                      <b>Código postal: </b><p>${inmueble.Codigo_Postal}</p>
                    </div>
                    <div>
                      <b>Precio: </b><p>${inmueble.Precio}</p>
                    </div>
                    <div>
                      <b>Tipo: </b><p>${inmueble.Tipo}</p>
                    </div>
                  </div>
                </div>`
              precioIn=parseFloat(inmueble.Precio.replace("$","").replace(",",""))
              if((filtro.ciudad==="" || filtro.ciudad===inmueble.Ciudad) &&
               (filtro.tipo==="" || filtro.tipo===inmueble.Tipo) &&
               ((filtro.precio[0]==0 && filtro.precio[1]==0)|| (filtro.precio[0] <= precioIn) && (precioIn <= filtro.precio[1]))
               ){
                clasificado.append(cuerpoHTML)
               }
            })
          })
      }

    }
  })()
  Buscador.Init();
  setTimeout(()=>{
    $('select').material_select();
  },1000);
})(document, window, document, jQuery);
