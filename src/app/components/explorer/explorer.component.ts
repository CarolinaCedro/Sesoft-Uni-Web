import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/api/users.service";
import {User} from "../../interfaces/user.models";

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {

  users: User[] = []

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getMyFollowers()
  }

  getMyFollowers() {
    this.userService.getAllUsers().subscribe(
      res => {
        console.log("res", res)
        this.users = res?.result
      }
    )
  }

  onFollow(item: any) {
    console.log("teste")
  }
}
