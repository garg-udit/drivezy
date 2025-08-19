package com.drivezy.drivezyBackend.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.nio.file.Files;
import java.util.UUID;

@Component
public class S3Util {
    private final S3Client s3Client;

    @Value("${aws.bucket.name}")
    private String bucketName;

    public S3Util(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    public String uploadFile(MultipartFile file, String folder) throws IOException {
        String filename = folder + "/" + UUID.randomUUID() + "-" + file.getOriginalFilename();
        var putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(filename)
                .contentType(file.getContentType())
                .build();

        s3Client.putObject(putObjectRequest, software.amazon.awssdk.core.sync.RequestBody.fromInputStream(
                file.getInputStream(), file.getSize()));

        return "https://" + bucketName + ".s3.ap-south-1.amazonaws.com/" + filename;
    }
}
