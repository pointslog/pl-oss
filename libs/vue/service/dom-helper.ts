export class DomHelper {
  static download(name: string, data: string): void {
    const a = document.createElement('a');
    a.href = data;
    a.download = name;
    a.click();
  }

  static async fileToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }
}
