import { WebSocketGateway, SubscribeMessage, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class QuizGateway {
  @WebSocketServer() server: Server;

  rooms: Record<string, { players: string[], readyPlayers: number }> = {};

  @SubscribeMessage('createRoom')
  handleCreateRoom(client: any, payload: any): void {
    const roomId = payload.roomId;
    this.rooms[roomId] = { players: [], readyPlayers: 0 };
    client.join(roomId);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: any, payload: any): void {
    const roomId = payload.roomId;
    this.rooms[roomId].players.push(client.id);
    client.join(roomId);
  }

  @SubscribeMessage('joinQuiz')
  handleJoinQuiz(client: any, payload: any): void {
    // Logique pour gérer la connexion d'un joueur au quiz
    this.server.emit('playerJoined', { playerId: client.id, playerName: payload.playerName });
  }

  @SubscribeMessage('submitAnswer')
  handleAnswerSubmission(client: any, payload: any): void {
    // Logique pour gérer la soumission de la réponse d'un joueur
    this.server.emit('answerSubmitted', { playerId: client.id, answer: payload.answer });
  }
}
