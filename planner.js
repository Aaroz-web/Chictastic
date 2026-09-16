(function(){
  const daysEl=document.getElementById('calendarDays');
  const monthEl=document.getElementById('calendarMonth');
  const dateInput=document.getElementById('travelDate');
  const dateLabel=document.getElementById('selectedDateLabel');
  const budget=document.getElementById('budget');
  const budgetValue=document.getElementById('budgetValue');
  const form=document.getElementById('tripForm');
  if(!daysEl||!monthEl||!dateInput||!dateLabel||!budget)return;
  let view=new Date();view.setDate(1);let selected='';
  const months=['Tammikuu','Helmikuu','Maaliskuu','Huhtikuu','Toukokuu','Kesäkuu','Heinäkuu','Elokuu','Syyskuu','Lokakuu','Marraskuu','Joulukuu'];
  const pad=n=>String(n).padStart(2,'0');
  const key=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
  const format=d=>d.toLocaleDateString('fi-FI',{day:'numeric',month:'long',year:'numeric'});
  function render(){
    monthEl.textContent=months[view.getMonth()]+' '+view.getFullYear();daysEl.innerHTML='';
    const first=new Date(view.getFullYear(),view.getMonth(),1);const offset=(first.getDay()+6)%7;const count=new Date(view.getFullYear(),view.getMonth()+1,0).getDate();const prevCount=new Date(view.getFullYear(),view.getMonth(),0).getDate();const today=key(new Date());
    for(let i=0;i<42;i++){
      let num=i-offset+1,year=view.getFullYear(),month=view.getMonth(),muted=false;
      if(num<1){num=prevCount+num;month--;muted=true}else if(num>count){num-=count;month++;muted=true}
      const d=new Date(year,month,num),b=document.createElement('button');b.type='button';b.className='calendar-day'+(muted?' muted':'')+(key(d)===today?' today':'')+(key(d)===selected?' selected':'');b.textContent=num;
      b.addEventListener('click',function(){selected=key(d);dateInput.value=selected;dateLabel.textContent=format(d);render()});daysEl.appendChild(b);
    }
  }
  document.getElementById('prevMonth').addEventListener('click',()=>{view.setMonth(view.getMonth()-1);render()});
  document.getElementById('nextMonth').addEventListener('click',()=>{view.setMonth(view.getMonth()+1);render()});
  function updateBudget(){budgetValue.textContent=Number(budget.value).toLocaleString('fi-FI')+' €'}
  budget.addEventListener('input',updateBudget);updateBudget();render();
  if(form)form.addEventListener('submit',function(e){if(!dateInput.value){e.preventDefault();e.stopImmediatePropagation();dateLabel.textContent='Valitse päivä';dateLabel.style.background='#f3e4de';dateLabel.style.color='#8a4938'}},true);
})();