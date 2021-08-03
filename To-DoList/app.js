
 
function addItem(){
     
    tit=document.getElementById("title").value;
   des=document.getElementById("Description").value;

   if(localStorage.getItem('itemsJson')==null){
       Arr=[];
       Arr.push([tit,des]);
       localStorage.setItem('itemsJson',JSON.stringify(Arr));
   }
   else{
      arrString=localStorage.getItem('itemsJson');
      Arr=JSON.parse(arrString);
      Arr.push([tit,des]);
      localStorage.setItem('itemsJson',JSON.stringify(Arr));
   }
  
 
update();
}
 
 function update(){

    if(localStorage.getItem('itemsJson')==null){
        Arr=[];
        localStorage.setItem('itemsJson',JSON.stringify(Arr));
    }
    else{
        arrString=localStorage.getItem('itemsJson');
        Arr=JSON.parse(arrString);
    }

    let tableBody = document.getElementById("tableBody");
                let str = "";
                Arr.forEach((element, index) => {
                    str += `
                    <tr>
                    <th scope="row">${index + 1}</th>
                    <td>${element[0]}</td>
                    <td>${element[1]}</td> 
                    <td><button class="btn-del" onclick="deleted(${index})">Delete</button></td> 
                    </tr>`; 
                });
                tableBody.innerHTML = str;
 }
 
 function deleted(index){

    arrString=localStorage.getItem('itemsJson');
    arr=JSON.parse(arrString);

    arr.splice(index,1);
    localStorage.setItem('itemsJson',JSON.stringify(arr));
    update();

 }

function clearList(){
    if(confirm("Do you really want to clear the list?")){
    localStorage.clear();
     update();       }
}

 update();


 // some cool blue shades #488ccf, #5CA4EA