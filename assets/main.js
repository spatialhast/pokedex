$(document).ready(function() {

    var url = 'http://pokeapi.co/api/v1/pokemon/?limit=12';
    var pdType =[];
    
    function loadData() {

        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            success: function(data) {
                url = 'http://pokeapi.co' + data.meta.next;

                $.each(data.objects, function(index, pdata) {

                    var pName = pdata.name,
                        pId = pdata.pkdx_id,
                        pAttack = pdata.attack,
                        pDefense = pdata.defense,
                        pHp = pdata.hp,
                        pSp_atk = pdata.sp_atk,
                        pSp_def = pdata.sp_def,
                        pSpeed = pdata.speed,
                        pWeight = pdata.weight,
                        pMoves = pdata.moves.length;
   
                    // get pType data
                    var ptypeArray = [],
                        dataTypeArray = [];

                    $.each(pdata.types, function(index, ptype) {
                        var typeElement = '<a href="#" class="btn btn-default btn-xs ' + ptype.name + '">' + ptype.name + '</a>&nbsp;';
                        ptypeArray.push(typeElement);
                        dataTypeArray.push(ptype.name);
                        
                        pdType.push(ptype.name);
                    });

                    ptypeArray.sort();
                    dataTypeArray.sort();
                    
                    var pType = ptypeArray.join('');
                    var pDataType = dataTypeArray.join(' ');
                    
                    
                    var content = '<div class="col-md-4 ' + pDataType + '">' +
                            '<div class="thumbnail list" data-id="' + pId + '" data-type="' + pDataType + '"' +
                            '" data-name="' + pName + '"' +
                            '" data-attack="' + pAttack + '"' +
                            '" data-defense="' + pDefense + '"' +
                            '" data-hp="' + pHp + '"' +
                            '" data-spatk="' + pSp_atk + '"' +
                            '" data-def="' + pSp_def + '"' +
                            '" data-speed="' + pSpeed + '"' +
                            '" data-weight="' + pWeight + '"' +
                            '" data-moves="' + pMoves + '"' +
                            '>' +
                            '<img src="http://pokeapi.co/media/img/' + pId + '.png" height="120" width="120" alt="Pockemon">' +
                                '<div class="caption">' +
                                    '<h4>' + pName + '</h4>' +
                                    '<p>' + pType + '</p>' +
                                '</div>' +
                            '</div>' +
                        '</div>';

                    $('#dataList').append(content);
                });

                // display load button
                $('#loadButtonPanel').css('display', 'block');
                $('#loadingMain').hide();
                $('#loadingButton').css('display', 'none');

                // scroll page to bottom
                var numItems = $('.thumbnail.list').length;
                if (numItems > 12) {
                    $('html, body').animate({
                        scrollTop: $(document).height()
                    }, 1000);
                };
                
                                
                // Filter control
                var fData = $.unique( pdType.sort());
                var fContent = ["Filter: | <a href='#' id='all'>All</a> | "];
                fData.forEach(function(item, i, arr) {
                    var fElem = "<a href='#' id='" + item + "'>" + item + "</a> | ";
                    fContent.push(fElem);
                });
                
                // filter               
                var filterContent = fContent.join('');
                
                $('#filters').empty();
                $('#filters').append(filterContent); 

                
                $('#filters a').click(function(e){  
                    e.preventDefault();  

                    var filter = $(this).attr('id');  

                    console.log(filter)
                    
                    $('.col-md-4').show();  

                    $('.col-md-4:not(.' + filter + ')').hide();  
              
                    if(filter === 'all') {
                        $('.col-md-4').show();
                    };
                });
            }
        });
   
    };

    $('body').delegate('.thumbnail.list', 'click', function(e) {
        e.preventDefault();
        
        $('.thumbnail.list').css('border', '1px solid #ddd'); // reset border style to default
        
        $(this).css('border', '2px solid #777'); // set custom border style
        
        var dataPockemonId = $(this).data('id');

        var pd_name = $(this).data('name'), 
            pd_attack = $(this).data('attack'),  
            pd_defense = $(this).data('defense'),  
            pd_hp = $(this).data('hp'),  
            pd_sp_atk = $(this).data('spatk'),  
            pd_sp_def = $(this).data('def'),  
            pd_speed = $(this).data('speed'),  
            pd_weight = $(this).data('weight'),  
            pd_moves = $(this).data('moves');

                var pokemonData = '<div class="thumbnail details">' + //delete affix
                    '<img src="http://pokeapi.co/media/img/' + dataPockemonId + '.png" height="120" width="120" alt="Pockemon">' +
                    '<div class="caption">' +
                    '<h4>' + pd_name + ' #' + dataPockemonId + '</h4>' +
                    '<table class="table table-bordered">' +
                    '<thead>' +
                    '<tr>' +
                    '<th>Type</th>' +
                    '<th>Fire</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td>Attack</td>' +
                    '<td>' + pd_attack + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td>Defense</td>' +
                    '<td>' + pd_defense + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td>HP</td>' +
                    '<td>' + pd_hp + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td>SP Attack</td>' +
                    '<td>' + pd_sp_atk + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td>SP Defense</td>' +
                    '<td>' + pd_sp_def + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td>Speed</td>' +
                    '<td>' + pd_speed + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td>Weight</td>' +
                    '<td>' + pd_weight + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td>Total moves</td>' +
                    '<td>' + pd_moves + '</td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>' +
                    '</div>' +
                    '</div>';

                $('.thumbnail.details').remove(); // remove previous pokemon detail information
                $('#pokemonDetails').append(pokemonData);

                // scroll page to bottom when browser width <992
                var viewportWidth = $(window).width();
                if (viewportWidth < 992) {
                    $('.thumbnail.details').removeClass('affix')
                    $('html, body').animate({
                        scrollTop: $(document).height()
                    }, 1000);
                } else {
                    $('.thumbnail.details').toggleClass('affix')
                };
    });
    
    // Load More
    $('#pockemonLoadBtn').on('click', function() {
        $('#loadingButton').css('display', 'block');
        loadData();
        $('.col-md-4').show();
    });

    loadData();

});