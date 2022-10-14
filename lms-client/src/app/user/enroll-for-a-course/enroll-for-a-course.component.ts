import { Component, OnInit } from '@angular/core';
import { GetCoursesService } from 'src/app/services/get-courses.service';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-enroll-for-a-course',
  templateUrl: './enroll-for-a-course.component.html',
  styleUrls: ['./enroll-for-a-course.component.css']
})
export class EnrollForACourseComponent implements OnInit {
  public errorMessageStatus = false
  public errorMessage = ''

  public messageStatus = false;
  public message = ''

  public allCourses = []

  constructor(
    private _getCourses: GetCoursesService,
    private _cartService: CartService,

  ) { }

  ngOnInit(): void {
    this._getCourses.getAllCourses({}).subscribe((res:any)=>{
      if(res.status == false) {
        this.errorMessageStatus = true;
        this.errorMessage = res.message

        this.messageStatus = true;
        this.message = res.message;
      }else {
        this.allCourses = res.allCourses;
        // console.log(res)
      }
    },
    err=>(console.log(err))
    )
  }

  addToCart(course: any) {
    this._cartService.addToCart(course).subscribe((res:any)=> {
      if(res.status == false) {
        this.errorMessageStatus = true;
        alert(res.message)

        this.messageStatus = true;
        alert(res.message)
      }else {
        // let snackBarRef = this._snackBar.open('Added to cart', 'Close');
        console.log(res)
        this.allCourses = res.allCourses
      }
    },
    err=>(console.log(err))
    )
  }
  // openSnackBar(message: string, action: string) {
  //   this._snackBar.open(message, 'action');
  //   this._snackBar.open('Message archived', 'Undo', {
  //     duration: 3000
  //   });
  // }

}
