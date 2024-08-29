import { FileService } from '../file/file.service';

export const fileServiceMock = {
  provide: FileService,
  useValue: {
    getDestinantionPath: jest.fn(),
    upload: jest.fn().mockResolvedValue(''),
  },
};
