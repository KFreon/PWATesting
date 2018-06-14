import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../../services/api/api-client.service';
import { Character } from 'src/app/models/character';

@Component({
  selector: 'app-origins',
  templateUrl: './origins.component.html',
  styleUrls: ['./origins.component.css']
})
export class OriginsComponent implements OnInit {

  characters: Character[];

  constructor(private apiClientService: ApiClientService) { }

  async ngOnInit() {
    this.characters = await this.apiClientService.get<Character[]>("/api/characters");
    console.log(this.characters);
  }
}
