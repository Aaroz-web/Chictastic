(function(){
  const daysEl=document.getElementById('calendarDays'),monthEl=document.getElementById('calendarMonth'),dateInput=document.getElementById('travelDate'),dateLabel=document.getElementById('selectedDateLabel'),budget=document.getElementById('budget'),budgetValue=document.getElementById('budgetValue'),form=document.getElementById('tripForm');
  if(!daysEl||!monthEl||!dateInput||!dateLabel||!budget)return;
  const durationLabel=document.querySelector('#duration')?.closest('label'); if(durationLabel)durationLabel.remove();
  const endInput=document.createElement('input');endInput.type='hidden';endInput.id='travelEndDate';endInput.name='travelEndDate';dateInput.insertAdjacentElement('afterend',endInput);
  const help=document.querySelector('.planner-help');if(help)help.textContent='Valitse ensin lähtöpäivä ja sitten paluupäivä.';
  let view=new Date();view.setDate(1),start='',end='';
  const months=['Tammikuu','Helmikuu','Maaliskuu','Huhtikuu','Toukokuu','Kesäkuu','Heinäkuu','Elokuu','Syyskuu','Lokakuu','Marraskuu','Joulukuu'];
  const pad=n=>String(n).padStart(2,'0'),key=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate()),parse=s=>{const[y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d)},format=d=>d.toLocaleDateString('fi-FI',{day:'numeric',month:'short',year:'numeric'});
  function render(){
    monthEl.textContent=months[view.getMonth()]+' '+view.getFullYear();daysEl.innerHTML='';
    const first=new Date(view.getFullYear(),view.getMonth(),1),offset=(first.getDay()+6)%7,count=new Date(view.getFullYear(),view.getMonth()+1,0).getDate(),prevCount=new Date(view.getFullYear(),view.getMonth(),0).getDate(),today=key(new Date());
    for(let i=0;i<42;i++){
      let num=i-offset+1,year=view.getFullYear(),month=view.getMonth(),muted=false;
      if(num<1){num=prevCount+num;month--;muted=true}else if(num>count){num-=count;month++;muted=true}
      const d=new Date(year,month,num),k=key(d),b=document.createElement('button');b.type='button';let cls='calendar-day'+(muted?' muted':'')+(k===today?' today':'');
      if(k===start||k===end)cls+=' selected';if(start&&end&&k>start&&k<end)cls+=' in-range';b.className=cls;b.textContent=num;
      b.addEventListener('click',function(){
        if(!start||start&&end){start=k;end='';endInput.value='';dateInput.value=start;dateLabel.textContent='Lähtö: '+format(d)}
        else if(k<start){end=start;start=k;dateInput.value=start;endInput.value=end;dateLabel.textContent='Lähtö: '+format(parse(start))+' · Paluu: '+format(parse(end))}
        else{end=k;endInput.value=end;dateInput.value=start;dateLabel.textContent='Lähtö: '+format(parse(start))+' · Paluu: '+format(d)}render();
      });daysEl.appendChild(b);
    }
  }
  document.getElementById('prevMonth').addEventListener('click',()=>{view.setMonth(view.getMonth()-1);render()});document.getElementById('nextMonth').addEventListener('click',()=>{view.setMonth(view.getMonth()+1);render()});
  function updateBudget(){budgetValue.textContent=Number(budget.value).toLocaleString('fi-FI')+' €'}budget.addEventListener('input',updateBudget);updateBudget();render();
  if(form)form.addEventListener('submit',function(e){if(!start||!end){e.preventDefault();e.stopImmediatePropagation();dateLabel.textContent=!start?'Valitse lähtö- ja paluupäivä':'Valitse paluupäivä';dateLabel.style.background='#f3e4de';dateLabel.style.color='#8a4938'}},true);
})();