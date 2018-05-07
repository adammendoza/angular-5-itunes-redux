import { RouterStateSerializer } from "@ngrx/router-store";
import { RouterStateSnapshot, Params} from "@angular/router";


export interface RouterStateUrl {
  url: string;
  queryParams: Params;
}


export class CustomRouterStateSerializer implements RouterStateSerializer<RouterStateUrl>{
  serialize(snapshot: RouterStateSnapshot) : RouterStateUrl{
    return {
      url: snapshot.url,
      queryParams: snapshot.root.queryParams
    };
  }
}



