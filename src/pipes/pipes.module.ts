import { NgModule } from '@angular/core';
import { UnixMomentPipe } from './unix-moment/unix-moment';

@NgModule({
	declarations: [UnixMomentPipe],
	imports: [],
	exports: [UnixMomentPipe]
})
export class PipesModule {}
