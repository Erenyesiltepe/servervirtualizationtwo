<?php

namespace App\Controllers;
use Liman\Toolkit\Shell\Command;

class RequestController
{
    public function request($endpoint, $data, $type)
    {
        $request = getResponse(function ($client) use ($type, $endpoint, $data) {
            return $client->request(strtoupper($type), getUrl($endpoint), count($data) ? [
                'json' => $data
            ] : []);
        });

        return $request;
    }

    private function saveScene($jsonString,$filename)
    {
        try {
            $filePath = getPath("app/scenes"). '/' . $filename.".json";
    
            // Write the JSON string to the file
            $bytesWritten = file_put_contents($filePath, json_encode($jsonString));
    
            if ($bytesWritten === false) {
                throw new Exception("Failed to write data to the file.");
            }
    
            // Return the path to the created file
            return $filePath;
        } catch (Exception $e) {
            // Handle the exception
            return "Error: " . $e->getMessage();
        }
    }
    private function loadScene($filename)
    {
        try {
                $filePath = getPath("app/scenes"). '/' . $filename;
                // Check if the file exists
                if (!file_exists($filePath)) {
                    throw new Exception("File not found: $filePath");
                }
        
                // Read the JSON file content
                $jsonContent = file_get_contents($filePath);
        
                if ($jsonContent === false) {
                    throw new Exception("Failed to read file: $filePath");
                }
        
                // Decode the JSON content
                $jsonData = json_decode($jsonContent, true);
        
                if ($jsonData === null && json_last_error() !== JSON_ERROR_NONE) {
                    throw new Exception("Error decoding JSON: " . json_last_error_msg());
                }
        
                return $jsonData;
            } catch (Exception $e) {
                // Handle the exception
                throw new Exception("Error in readJsonFile: " . $e->getMessage());
            }
    }

    private function getSceneNames(){
        $sceneNames=Command::runSudo("ls {:path}", [
			"path" => getPath("app/scenes")
		]);
        return $sceneNames;
    }

    public function sceneProxy()
    {
        validate([
            "type" => "required|in:get,post,put,patch,delete",
            "endpoint" => "required",
            "data" => "json"
        ]);
        $endpoint = request("endpoint");
        $data = json_decode(request("data") ? request("data") : "[]", true);
        $type = request("type");
        
        $result;
        if($endpoint=="names"){
            $result=$this->getSceneNames();
        }
        elseif($endpoint=="scene" && $type=="post"){
        
            $result=$this->saveScene($data["scene"],$data["name"]);
        }
        elseif($endpoint=="scene" && $type=="get"){
            $result=$this->loadScene($data);
        }

        return respond($result);
    }
}