import {NextRequest,NextResponse} from 'next/server';
export const runtime='nodejs';
const times=new Set(['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00']);
export async function POST(request:NextRequest){
const url=process.env.SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;
if(!url||!key)return NextResponse.json({error:'Booking backend is not configured yet. Set Supabase environment variables.'},{status:503});
let data:Record<string,unknown>;try{data=await request.json()}catch{return NextResponse.json({error:'Invalid JSON request.'},{status:400})}
const {name,email,phone,date,time,guests,notes}=data;
if(typeof name!=='string'||name.trim().length<2||name.length>100||typeof email!=='string'||email.length>200||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||typeof phone!=='string'||!/^[0-9+\s()-]{10,16}$/.test(phone)||typeof date!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(date)||!Number.isFinite(Date.parse(date))||typeof time!=='string'||!times.has(time)||!Number.isInteger(Number(guests))||Number(guests)<1||Number(guests)>10||typeof notes!=='string'||notes.length>500)return NextResponse.json({error:'Please provide valid booking details.'},{status:400});
const today=new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Kolkata'});if(date<today)return NextResponse.json({error:'Please select today or a future date.'},{status:400});
const id='AUR-'+crypto.randomUUID().slice(0,8).toUpperCase();
try{const response=await fetch(`${url.replace(/\/$/,'')}/rest/v1/bookings`,{method:'POST',headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify({id,name:name.trim(),email,phone,date,time,guests:Number(guests),notes,status:'pending'}),cache:'no-store'});
if(!response.ok){console.error('Booking DB insert failed:',response.status);return NextResponse.json({error:'Unable to save the booking request. Try again later.'},{status:502})}
return NextResponse.json({id,status:'pending'},{status:201})}catch{return NextResponse.json({error:'Booking service unavailable.'},{status:502})}
}
