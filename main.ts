import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import { Student } from './student.js';

import { dataStudents } from './dataStudents.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentsTbody: HTMLElement = document.getElementById('students')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;
const inputSearchBoxCredits: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box-cr");
const inputSearchBoxCredits2: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box-cr2");
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


btnfilterByName.onclick = () => applyFilterByName();

btnfilterByCredits.onclick = () => applyFilterByCredits();

renderCoursesInTable(dataCourses);

renderStudentsInTable(dataStudents);

totalCreditElm.innerHTML = `${"Total Creditos:     "+getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function renderStudentsInTable(students: Student[]): void {

    console.log('Desplejando estudiantes');
    students.forEach((student) => {
        let trElement = document.createElement("tr");
        trElement.innerHTML = `<td>${"Codigo"}</td>
                                <td>${student.codigo}</td>`;
        let trElement2 = document.createElement("tr");
        trElement2.innerHTML = `<td>${"Cedula"}</td>
                                <td>${student.cedula}</td>`;
        let trElement3 = document.createElement("tr");
        trElement3.innerHTML = `<td>${"Edad"}</td>
                                <td>${student.edad}</td>`;
        let trElement4 = document.createElement("tr");
        trElement4.innerHTML = `<td>${"Direccion"}</td>
                                <td>${student.direccion}</td>`;
        let trElement5 = document.createElement("tr");
        trElement5.innerHTML = `<td>${"Telefono"}</td>
                                <td>${student.telefono}</td>`;
        studentsTbody.appendChild(trElement);
        studentsTbody.appendChild(trElement2);
        studentsTbody.appendChild(trElement3);
        studentsTbody.appendChild(trElement4);
        studentsTbody.appendChild(trElement5);
    });
}
 

 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
  //btnfilterByName.onclick = () => applyFilterByName();
}

function applyFilterByCredits(){
    let low = inputSearchBoxCredits.valueAsNumber;
    let high = inputSearchBoxCredits2.valueAsNumber;
    low = (low == null) ? 10 : low;
    high = (high == null) ? 1 : high;
    clearCoursesInTable();
    let coursesFiltered: Course[] =searchCourseInCreditsRange(low, high, dataCourses);
    renderCoursesInTable(coursesFiltered);
    //btnfilterByCredits.onclick = () => applyFilterByCredits();
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function searchCourseInCreditsRange(lower: number, high: number, courses: Course[]) {

   
    return lower>high ? dataCourses : courses.filter( c => 
        (c.credits>= lower && c.credits <=high));    
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}

