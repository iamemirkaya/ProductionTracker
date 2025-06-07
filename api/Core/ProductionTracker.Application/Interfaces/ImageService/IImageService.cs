using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;


namespace ProductionTracker.Application.Interfaces.ImageService
{
    public interface IImageService
    {
        Task<ImageUploadResult> AddImageAsync(IFormFile file);
        Task<DeletionResult> DeleteImageAsync(string publicId);

        Task<ImageUploadResult> UpdateImageAsync(IFormFile file, string publicId);
    }
}
