function elem_cell_automata(rule){
  reset_grid(); 
  var init_row = [1];
  
  (function loopEvolve(row) {          
    var max_row = 50;
     setTimeout(function () {   
        color_grid(init_row, row, 100);
        init_row = evolve(rule, init_row);
        if (++row < max_row) loopEvolve(row);
   }, 20)
  })(0);    
}

function out(text){
    $('#container').append(text+"\n");
}

function evolve(rule, state){
    next_state=[];
    for(var i=-1; i <= state.length; i++){
        bit = state[i+1] | (state[i] << 1) | (state[i-1] << 2);
        mask = 1 << bit;
        next_state[i+1] = ((mask & rule) != 0) ? 1 : 0;
    }
    return next_state;
}

function init_grid(num){
    for(i=num;i>0;i--){
        $(".grid").append("<square></square>")
    }
}

function reset_grid(num){
  $(".grid square").css( "background", "#000" );
  $(".grid square:nth-child(3n)").css( "background", "#111" );
  $(".grid square:nth-child(3n-1)").css( "background", "#222" );
}

function color_grid(vals, row, width){
  for(var col = 0; col < vals.length; col++){
    var idx = width/2 - row + (row * width + col);
    if(vals[col] == 1){
      $(".grid square:eq(" + idx + ")").css( "background", "#fff" );
    }
  }
}
