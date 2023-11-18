import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/api/users.service";
import {User} from "../../interfaces/user.models";

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {

  user: User[] = []



  events = [
    {
      title: 'Evento 1',
      date: '2023-10-25',
      location: 'Local 1',
      description: 'Descrição do Evento 1'
    },
    {
      title: 'Evento 2',
      date: '2023-11-15',
      location: 'Local 2',
      description: 'Descrição do Evento 2'
    },
    {
      title: 'Evento 3',
      date: '2023-12-05',
      location: 'Local 3',
      description: 'Descrição do Evento 3'
    }
  ];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }

  getMyFollowers() {
    this.userService.getFollowingUsers().subscribe(
      res => {
        console.log("res", res)
      }
    )
  }
}
