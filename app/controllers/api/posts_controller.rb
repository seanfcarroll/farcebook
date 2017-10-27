class Api::PostsController < ApplicationController
  before_action :ensure_logged_in

  def feed

  end

  def index
    @posts = Post.where(receiver_id: params[:user_id])
                  .order(updated_at: :asc)
  end

  def create
    @post = Post.new(post_params)
    @post.author = current_user
    if @post.save
      render :post
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  def update
    @post = Post.find(params[:id])
    @post.update_attributes(post_params)
    @post.save
    render :post
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    render :post
  end

  private

  def post_params
    params.require(:post).permit(:body, :receiver_id)
  end
end
