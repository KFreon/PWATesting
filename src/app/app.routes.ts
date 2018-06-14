import { Routes } from '@angular/router';
import { CharactersComponent } from './routes/characters/characters.component';
import { AuthorizeComponent } from './routes/authorize/authorize.component';
import { LogoutComponent } from './routes/logout/logout.component';
import { RequireAuthGuard } from './guards/require-auth/require-auth.guard';
import { OriginsComponent } from './routes/origins/origins.component';

export const appRoutes: Routes = [
    {
        path: 'characters',
        component: CharactersComponent,
        canActivate: [RequireAuthGuard]
    },
    {
        path: 'origins',
        component: OriginsComponent,
        canActivate: [RequireAuthGuard]
    },
    {
        path:'',
        redirectTo: '/characters',
        pathMatch: 'full'
    },
    {
        path: 'authorize',
        component: AuthorizeComponent
    },
    {
        path: 'logout',
        component: LogoutComponent
    }
];