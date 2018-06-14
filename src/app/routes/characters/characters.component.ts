import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../../services/api/api-client.service';
import { Character } from 'src/app/models/character';

@Component({
    selector: 'app-characters',
    templateUrl: './characters.component.html',
    styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

    characters: Character[];

    constructor(private apiClientService: ApiClientService) { }

    async ngOnInit() {
        this.characters = await this.apiClientService.get<Character[]>("/api/characters");
        console.log(this.characters);
    }
}