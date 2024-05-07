import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CommentDto } from "./dto";
import { ApiTags } from "@nestjs/swagger";

@Controller('comments')
@ApiTags('comments')

export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Post()
    async createComment(@Body() body: CommentDto){
        return await this.commentService.createComment(body);
    }

    @Get(':productId')
    async getCommentsByProductId(@Param('productId') productId: string){
        return await this.commentService.getCommentsByProductId(productId);
    }
}